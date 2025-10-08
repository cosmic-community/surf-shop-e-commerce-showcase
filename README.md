# 🏄 Surf Shop - E-Commerce Showcase

![App Preview](https://imgix.cosmicjs.com/2a074950-a3a4-11f0-962f-a5a34af2c54a-photo-1559827260-dc66d52bef19-1759858591470.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive e-commerce surf shop application built with Next.js 15 and powered by Cosmic CMS. Showcase your surf products, collections, and customer reviews with a beautiful, ocean-inspired design.

## ✨ Features

- 🏄 **Dynamic Product Catalog** - Browse all products with detailed information and images
- 📦 **Collection Organization** - Filter products by collections (Surfboards, Apparel)
- 🛍️ **Product Detail Pages** - Individual product pages with galleries and specifications
- ⭐ **Customer Reviews** - Display authentic reviews with star ratings
- 🎨 **Responsive Design** - Optimized for all devices (desktop, tablet, mobile)
- 🖼️ **Image Optimization** - Automatic optimization using imgix for fast loading
- 🔍 **Collection Showcases** - Dedicated pages for each product collection
- 💪 **TypeScript** - Full type safety with comprehensive type definitions

## 🚀 Quick Start with Clone

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e54efe39d1c0696daa59a1&clone_repository=68e5516d39d1c0696daa59bb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce surf shop with products, collections, and customer reviews"

### Code Generation Prompt

> "Based on the content model I created for "Design a content model for an e-commerce surf shop with products, collections, and customer reviews", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Framework**: Next.js 15 (App Router)
- **CMS**: Cosmic (Headless CMS)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Optimization**: imgix
- **Package Manager**: bun
- **SDK**: @cosmicjs/sdk v1.5.5

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with a bucket containing:
  - Products with metadata (description, price, images, sizes, colors, stock status)
  - Collections with descriptions and hero images
  - Reviews with ratings, text, and linked products

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd surf-shop
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory with the following variables:
4. **Run the development server**
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Cosmic SDK Examples

### Fetching Products with Collections

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with their associated collections
const response = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const products = response.objects as Product[]
```

### Fetching a Single Product

```typescript
// Get product by slug with full details
const response = await cosmic.objects
  .findOne({
    type: 'products',
    slug: productSlug
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const product = response.object as Product
```

### Fetching Reviews for a Product

```typescript
// Get reviews linked to a specific product
const response = await cosmic.objects
  .find({
    type: 'reviews',
    'metadata.product': productId
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)

const reviews = response.objects as Review[]
```

## 🌐 Cosmic CMS Integration

This application uses the following Cosmic object types:

### Products
- **Description**: Product details and specifications
- **Price**: Product pricing (number)
- **Product Images**: Multiple images (files)
- **Sizes Available**: Size options (checkboxes)
- **Colors Available**: Color options (checkboxes)
- **In Stock**: Availability status (switch)
- **Collection**: Linked collection (object relation)

### Collections
- **Description**: Collection overview
- **Hero Image**: Collection banner image (file)

### Reviews
- **Rating**: Star rating (select-dropdown: 1-5 Stars)
- **Review Text**: Customer feedback (textarea)
- **Customer Name**: Reviewer name (text)
- **Product**: Linked product (object relation)

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
   - `JWT_SECRET`
   - `STRIPE_SECRET_KEY`
   - `RESEND_API_KEY`

### Deploy to Netlify

1. Push your code to GitHub
2. Create a new site in Netlify
3. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

## 📝 Project Structure

```
surf-shop/
├── app/
│   ├── collections/
│   │   └── [slug]/
│   │       └── page.tsx          # Collection detail pages
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx          # Product detail pages
│   ├── layout.tsx                # Root layout with navigation
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/
│   ├── CollectionCard.tsx        # Collection display component
│   ├── CollectionGrid.tsx        # Collections grid layout
│   ├── CosmicBadge.tsx          # "Built with Cosmic" badge
│   ├── Navigation.tsx            # Main navigation
│   ├── ProductCard.tsx           # Product display component
│   ├── ProductGrid.tsx           # Products grid layout
│   └── ReviewCard.tsx            # Review display component
├── lib/
│   └── cosmic.ts                 # Cosmic SDK configuration
├── types.ts                      # TypeScript type definitions
└── public/
    └── dashboard-console-capture.js  # Console logging for dashboard
```

## 🎨 Customization

### Styling

The application uses Tailwind CSS. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#0ea5e9',      // Sky blue
      secondary: '#0c4a6e',    // Dark blue
      // Add your custom colors
    }
  }
}
```

### Adding New Features

1. **Add a Cart System**: Implement state management for shopping cart
2. **Checkout Integration**: Add Stripe or other payment processing
3. **Product Search**: Add search functionality with filters
4. **Wishlist**: Allow users to save favorite products
5. **Product Variants**: Implement size/color selection with availability

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For questions or issues:
- Check the [Cosmic documentation](https://www.cosmicjs.com/docs)
- Visit the [Cosmic community](https://www.cosmicjs.com/community)
- Open an issue in this repository

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) - The Headless CMS for Modern Applications

<!-- README_END -->