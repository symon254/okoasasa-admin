import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Package, MapPin } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ListIcon, PinIcon, SingleUserIcon, WorldIcon, PhoneIcon } from '@/assets/icons'
import { CustomSelect } from '../Inputs/CustomSelect'
import { FormInput } from '../Inputs/FormInputs'
import { FormSelect } from '../Inputs/FormSelect'
import { FormTextarea } from '../Inputs/FormTextarea'
import { PhoneInput } from '../Inputs/FormPhone'
import { useStateContext } from '@/context/state-context'
import { usePickUpPoint, useRegion } from '@/lib/queries/orders'

// Phone validation schema
const kenyaPhoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .refine(
    (value) => {
      // Remove any spaces for validation
      const cleaned = value.replace(/\s/g, '')

      // Check if it starts with +254 (should be 13 characters total)
      if (cleaned.startsWith('+254')) {
        return cleaned.length === 13 && /^\+254\d{9}$/.test(cleaned)
      }

      // Check if it starts with 0 (should be 10 characters total)
      if (cleaned.startsWith('0')) {
        return cleaned.length === 10 && /^0\d{9}$/.test(cleaned)
      }

      return false
    },
    {
      message:
        'Please enter a valid Kenyan phone number',
    },
  )

// Base schema for common fields
const baseSchema = {
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  recipientNumber: kenyaPhoneSchema,
  region: z.string().min(1, 'Please select a region'),
}

// Schema for door delivery
const doorDeliverySchema = z.object({
  ...baseSchema,
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
  pickupStore: z.string().optional(),
})

// Schema for pickup station
const pickupStationSchema = z.object({
  ...baseSchema,
  pickupStore: z.string().min(1, 'Please select a pickup store'),
  deliveryAddress: z.string().optional(),
})

export default function DeliveryDetailsForm({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const { saveCheckoutFormData, getCheckoutFormData } = useStateContext()

  const savedData = getCheckoutFormData(3)

  const [deliveryType, setDeliveryType] = useState(
    savedData?.deliveryType || 'door',
  )

  // Track if this is the initial mount/restore
  const isInitialMount = useRef(true);
  const hasRestoredData = useRef(false);

  // Choose schema based on delivery type
  const currentSchema =
    deliveryType === 'door' ? doorDeliverySchema : pickupStationSchema

  // Initialize form with savedData directly in defaultValues
  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      firstName: savedData?.firstName || '',
      lastName: savedData?.lastName || '',
      recipientNumber: savedData?.recipientNumber || '',
      region: savedData?.region || '',
      pickupStore: savedData?.pickupStore || '',
      deliveryAddress: savedData?.deliveryAddress || '',
    },
  })

  const { data, isLoading, error } = useRegion({});
  const { data:pickUpData, isLoading:pickupLoading, error:pickupError } = usePickUpPoint({});

  // console.log('Fetched pickup data:', pickUpData?.body);

  const regions = data?.body?.regions || [];
  const pickupRegionsData = pickUpData?.body || [];

  // For door delivery, use the regions from the region API
  const doorRegionOptions = regions.map(region => ({
    value: region?.region_id,
    label: region?.region,
    id: region.id
  }));

  // For pickup, use regions from pickup API (so we only show regions with stores)
  const pickupRegionOptions = pickupRegionsData.map(regionData => ({
    value: regionData?.region,
    label: regionData?.region,
    id: regionData?.region
  }));

  // Get the currently selected region value
  const selectedRegion = form.watch('region');

  // Filter pickup stores based on selected region
  const pickupStoreOptions = (() => {
    if (!selectedRegion || deliveryType !== 'pickup') return [];
    
    const regionData = pickupRegionsData.find(
      item => item.region === selectedRegion
    );
    
    return regionData?.stores?.map(store => ({
      value: store.storeid,
      label: store.storename,
      id: store.storeid,
      storeDescription: store.store_description,
      address: store.address
    })) || [];
  })();

  // Determine which region options to use based on delivery type
  const regionOptions = deliveryType === 'door' ? doorRegionOptions : pickupRegionOptions;

  // Update form when savedData changes (with proper dependency management)
  useEffect(() => {
    if (savedData && !hasRestoredData.current) {
      
      // Reset form with saved data
      form.reset({
        firstName: savedData.firstName || '',
        lastName: savedData.lastName || '',
        recipientNumber: savedData.recipientNumber || '',
        region: savedData.region || '',
        pickupStore: savedData.pickupStore || '',
        deliveryAddress: savedData.deliveryAddress || '',
      });
      
      if (savedData.deliveryType) {
        setDeliveryType(savedData.deliveryType);
      }
      
      hasRestoredData.current = true;
    }
  }, [savedData, form]);

  // Reset hasRestoredData when component unmounts
  useEffect(() => {
    return () => {
      hasRestoredData.current = false;
    };
  }, []);

  // Reset validation when delivery type changes
  useEffect(() => {
    form.clearErrors()
  }, [deliveryType, form]);

  // Clear pickup store when region changes (for pickup type only)
  // But skip this on initial load when we're restoring saved data
  useEffect(() => {
    // Skip on first render (when restoring saved data)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (deliveryType === 'pickup' && selectedRegion) {
      // Only clear if the current pickup store is not in the new region's stores
      const currentStore = form.getValues('pickupStore');
      const isStoreInRegion = pickupStoreOptions.some(
        store => store.value === currentStore
      );
      
      if (!isStoreInRegion && currentStore) {
        form.setValue('pickupStore', '');
      }
    }
  }, [selectedRegion, deliveryType, pickupStoreOptions, form]);

  // Helper function to get region and store details
  const getRegionDetails = (regionValue) => {
    if (deliveryType === 'door') {
      // For door delivery, find from regions API
      const region = doorRegionOptions.find(opt => opt.value === regionValue);
      return {
        region: region?.label || '',
        regionId: region?.value || ''
      };
    } else {
      // For pickup, find from pickup API
      const regionData = pickupRegionsData.find(item => item.region === regionValue);
      return {
        region: regionData?.region || '',
        regionId: regionData?.stores?.[0]?.regionId || '' // Get regionId from first store
      };
    }
  };

  const getStoreDetails = (storeValue) => {
    const store = pickupStoreOptions.find(opt => opt.value === storeValue);
    return {
      store: store?.label || '',
      storeId: store?.value || '',
      storeDescription: store?.storeDescription || '',
      address: store?.address || ''
    };
  };

  const staticPickupStoreOptions = [
    { value: 'store1', label: 'Main Street Store', id: 'store-001' },
    { value: 'store2', label: 'City Center Post', id: 'store-002' },
    { value: 'store3', label: 'Westlands Station', id: 'store-003' },
  ]

  const onSubmit = (data) => {
    console.log('Form data:', data)

    // Prepare the shipping detail payload
    const regionDetails = getRegionDetails(data.region)
    const storeDetails = deliveryType === 'pickup' ? getStoreDetails(data.pickupStore) : {}

    const shippingDetailPayload = {
      shippingDetail: {
        recipientName: `${data.firstName} ${data.lastName}`,
        recipientPhoneNumber: data.recipientNumber,
        type: deliveryType === 'door' ? 'Delivery' : 'Pickup',
        recipientEmail: '', 
        recipientAddress: data.deliveryAddress || '',
        region: regionDetails.region,
        regionId: regionDetails.regionId,
        storeId: storeDetails.storeId || '',
        store: storeDetails.store || ''
      },
      // Keep original form data for internal use
      formData: {
        ...data,
        deliveryType
      }
    }

    console.log('Shipping detail payload:', shippingDetailPayload)

    // Save both the original form data and the structured payload
    const dataWithType = { 
      ...data, 
      deliveryType,
      apiPayload: shippingDetailPayload 
    }
    
    saveCheckoutFormData(3, dataWithType)
    onNext()
  }

  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type)
    // Clear both region and pickup store when switching delivery types
    form.setValue('region', '')
    form.setValue('pickupStore', '')
    form.setValue('deliveryAddress', '')
    // Reset the initial mount flag when delivery type changes manually
    isInitialMount.current = true;
  }

  return (
    <div className="flex flex-col items-center justify-center mb-[50px] p-0 md:p-0 gap-6">
      {/* Form Container - Height now adjusts automatically */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 w-full ">
        <div className="w-full">
          <div className="mb-4 md:mb-0 md:h-16">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
              Delivery Details
            </h2>
            <p className="text-gray-500 text-xs md:text-sm">
              {deliveryType === 'door'
                ? 'Fill in your preferred delivery location (Home or Office Address)'
                : 'I would like to pick up my package at the closest pick up point.'}
            </p>
          </div>

          <div className="h-px bg-gray-300 my-4 md:my-6"></div>

          {/* Delivery Type Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
            <button
              type="button"
              onClick={() => handleDeliveryTypeChange('door')}
              className={`flex items-center gap-2 p-3 md:p-4 rounded-lg border-2 transition-all ${
                deliveryType === 'door'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  deliveryType === 'door'
                    ? 'border-orange-500'
                    : 'border-gray-300'
                }`}
              >
                {deliveryType === 'door' && (
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                )}
              </div>
              <div className="text-left">
                <div className="font-medium text-sm md:text-base text-gray-900">
                  Door Delivery
                </div>
                <div className="text-xs text-gray-500">
                  We'll deliver to your doorstep
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDeliveryTypeChange('pickup')}
              className={`flex items-center gap-2 p-3 md:p-4 rounded-lg border-2 transition-all ${
                deliveryType === 'pickup'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  deliveryType === 'pickup'
                    ? 'border-orange-500'
                    : 'border-gray-300'
                }`}
              >
                {deliveryType === 'pickup' && (
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                )}
              </div>
              <div className="text-left">
                <div className="font-medium text-sm md:text-base text-gray-900">
                  Pickup Station
                </div>
                <div className="text-xs text-gray-500">
                  Pickup at a station near you
                </div>
              </div>
            </button>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[50px]">
                <FormInput
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your First Name"
                  icon={SingleUserIcon}
                />

                <FormInput
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your Last Name"
                  icon={SingleUserIcon}
                />
              </div>

              {deliveryType === 'door' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[50px]">
                    <PhoneInput
                      control={form.control}
                      name="recipientNumber"
                      label="Recipient Number"
                      placeholder="+254712345678 or 0712345678"
                      icon={PhoneIcon}
                    />

                    <FormSelect
                      control={form.control}
                      name="region"
                      label="Region"
                      placeholder="Enter your region"
                      options={regionOptions}
                      icon={WorldIcon}
                      isLoading={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1">
                    <FormTextarea
                      control={form.control}
                      name="deliveryAddress"
                      label="Delivery Address"
                      placeholder="Enter delivery address"
                      minRows={3}
                      maxRows={6}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[50px]">
                    <PhoneInput
                      control={form.control}
                      name="recipientNumber"
                      label="Recipient Number"
                      placeholder="+254712345678 or 0712345678"
                      icon={PhoneIcon}
                    />

                    <FormSelect
                      control={form.control}
                      name="region"
                      label="Region"
                      placeholder="Enter your region"
                      options={regionOptions}
                        icon={WorldIcon}
                        isLoading={pickupLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[50px]">
                    <FormSelect
                      control={form.control}
                      name="pickupStore"
                      label="Pick Up Store / Post"
                      placeholder="Location"
                      options={pickupStoreOptions}
                        icon={PinIcon}
                        isLoading={pickupLoading}
                    />
                    <div className="hidden md:block"></div>
                  </div>
                </>
              )}
            </form>
          </Form>
        </div>
      </div>

      {/* Buttons Container - Completely Outside */}
      <div className="flex flex-col-reverse md:flex-row justify-end gap-3 md:gap-4 w-full max-w-full">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          variant="outline"
          className="flex justify-center items-center px-4 py-3 w-full md:w-[146px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
        >
          Back{' '}
        </Button>
        <Button
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLastStep}
          className="flex justify-center items-center px-4 py-3 w-full md:w-[193px] h-[46px] bg-linear-to-b from-[#F8971D] to-[#EE3124] hover:opacity-90 text-white rounded-3xl font-medium disabled:opacity-50"
        >
          Next: Order Summary
        </Button>
      </div>
    </div>
  )
}