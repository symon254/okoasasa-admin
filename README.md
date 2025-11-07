# Okoa Sasa Web BNPL

A modern Buy Now Pay Later (BNPL) platform built with React, delivering seamless financial services for the digital age.

## 🚀 Overview

Okoa Sasa Admin Web BNPL is a comprehensive fintech application that enables customers to make purchases immediately and pay in installments. Built with cutting-edge technologies, it provides a smooth, secure, and user-friendly experience for both merchants and consumers.

## ✨ Key Features

### For Consumers

- **Instant Credit Approval** - Quick assessment and approval process
- **Flexible Payment Plans** - Multiple installment options
- **Real-time Payment Tracking** - Monitor payment schedules and history
- **Secure Transactions** - End-to-end encryption and security
- **Mobile-First Design** - Optimized for all devices
- **Digital Wallet Integration** - Seamless payment processing

### For Merchants

- **Merchant Dashboard** - Comprehensive analytics and reporting
- **Transaction Management** - Real-time transaction monitoring
- **Customer Insights** - Detailed customer analytics
- **Risk Assessment** - Built-in fraud detection and risk management
- **API Integration** - Easy integration with existing systems

### Technical Features

- **Progressive Web App (PWA)** - Native app-like experience
- **Offline Capability** - Core features work offline
- **Real-time Updates** - Live data synchronization
- **Advanced Security** - JWT authentication, encrypted storage
- **Performance Optimized** - Code splitting and lazy loading
- **Accessibility** - WCAG 2.1 AA compliant

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19.2.0 with JSX/TSX support
- **Router**: TanStack Router (file-based routing)
- **State Management**: TanStack Store + React Query
- **Styling**: Tailwind CSS 4.0 with CSS variables
- **UI Components**: Shadcn/ui + Radix UI primitives
- **Build Tool**: Vite 7.1.7 with Hot Module Replacement
- **Icons**: Lucide React + Tabler Icons

### Development Tools

- **Language**: JavaScript/TypeScript with JSX/TSX
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting**: ESLint with Prettier
- **Dev Tools**: React DevTools, TanStack DevTools
- **Package Manager**: npm (>= 8.0.0)
- **Node Version**: >= 18.0.0

### Key Libraries

- **HTTP Client**: Axios for API communication
- **Forms**: React Hook Form with Zod validation
- **Data Visualization**: Recharts for analytics
- **PDF Generation**: jsPDF for reports and invoices
- **Phone Input**: React Phone Number Input with libphonenumber-js
- **Date Handling**: date-fns for date manipulation
- **Animations**: Framer Motion for smooth interactions
- **File Processing**: XLSX for Excel import/export
- **Drag & Drop**: @dnd-kit for interactive components

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd okoa-sasa-web-bnpl
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

### Available Scripts

| Script                | Description                           |
| --------------------- | ------------------------------------- |
| `npm run dev`         | Start development server on port 3000 |
| `npm run build`       | Build for production                  |
| `npm run serve`       | Preview production build locally      |
| `npm test`            | Run unit tests                        |
| `npm run test:watch`  | Run tests in watch mode               |
| `npm run test:e2e`    | Run end-to-end tests                  |
| `npm run test:e2e:ui` | Run E2E tests with UI                 |
| `npm run test:all`    | Run all tests (unit + E2E)            |
| `npm run lint`        | Lint code with ESLint                 |
| `npm run lint:fix`    | Fix linting issues                    |
| `npm run format`      | Format code with Prettier             |
| `npm run check`       | Format and lint code                  |
| `npm run type-check`  | Run TypeScript type checking          |

## 🧪 Testing

### Unit Testing (Vitest)

```bash
npm test                    # Run once
npm run test:watch         # Watch mode
```

### End-to-End Testing (Playwright)

```bash
npm run test:e2e           # Headless mode
npm run test:e2e:headed    # With browser UI
npm run test:e2e:ui        # Interactive UI mode
```

### Full Test Suite

```bash
npm run test:all           # Run all tests
```

## 🎨 UI/UX Design System

### Design Tokens

- **Base Color**: Zinc
- **CSS Variables**: Enabled for dynamic theming
- **Icon Library**: Lucide React
- **Animation**: Tailwind CSS animations + Framer Motion

### Component Library

Built with Shadcn/ui and Radix UI primitives:

- **Forms**: Input, Select, Checkbox, Radio, etc.
- **Layout**: Card, Separator, Tabs, etc.
- **Feedback**: Alert, Toast, Progress, etc.
- **Navigation**: Menu, Breadcrumb, Pagination, etc.
- **Data Display**: Table, Avatar, Badge, etc.

### Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Following Tailwind CSS standard breakpoints
- **Touch Friendly**: Appropriate touch targets and gestures

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Encrypted Storage**: Sensitive data encryption at rest
- **CORS Protection**: Configured cross-origin resource sharing
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Built-in React XSS prevention
- **CSRF Protection**: Cross-site request forgery prevention

## 📊 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Intelligent caching strategies
- **Image Optimization**: Responsive images and lazy loading
- **PWA Features**: Service worker for offline functionality

## 🌍 Internationalization

- **Multi-language Support**: Ready for i18n implementation
- **RTL Support**: Right-to-left language compatibility
- **Locale-aware Formatting**: Numbers, dates, and currencies

## 📱 PWA Features

- **Offline Functionality**: Core features work without internet
- **Install Prompt**: Native app-like installation
- **Push Notifications**: Real-time updates and alerts
- **Background Sync**: Data synchronization when online

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Configuration

Create appropriate `.env` files for different environments:

- `.env.development` - Development settings
- `.env.staging` - Staging environment
- `.env.production` - Production settings

### Deployment Platforms

The application can be deployed to:

- **Vercel** (Recommended for React apps)
- **Netlify** (Static site hosting)
- **AWS S3 + CloudFront** (Enterprise solution)
- **Docker** (Containerized deployment)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow ESLint and Prettier configurations
- Write tests for new features
- Use conventional commit messages
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **API Documentation**: [Coming Soon]
- **Design System**: [Coming Soon]
- **Support**: [eric@libertyafrika.co.ke]

## 🏗️ Roadmap

### Phase 1 (Current)

- [x] Project setup and architecture
- [x] Core UI components
- [x] Authentication system
- [ ] Payment processing integration
- [ ] User dashboard

### Phase 2

- [ ] Merchant portal
- [ ] Advanced analytics
- [ ] Mobile app companion
- [ ] API integrations

### Phase 3

- [ ] AI-powered risk assessment
- [ ] Multi-currency support
- [ ] Advanced reporting
- [ ] Third-party marketplace integrations

---

**Built with ❤️ by the Okoa Sasa Team**

_For more information, visit our [website](https://okoasasa.com) or contact us at [eric@libertyafrika.co.ke]_
