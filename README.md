# LambdaBlog

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

A personal blog built with **Next.js 13, Tailwind CSS, and Contentlayer**. This project is a heavily customized and extended version of the original [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).

**Live Demo:** [**www.lambdax.me**](https://www.lambdax.me)

---

## 🚀 Features

This blog includes all the features of the original starter template, plus several significant enhancements:

- **MDX Support:** Write content using Markdown with the full power of React components.
- **Highly-Customized Components:**
  - **Interactive Newsletter Form:** A theme-aware subscription form with beautiful floating-label animations and clear submission states (loading, success, error).
  - **Dynamic Post License:** An elegant component displaying license information, with a Creative Commons background logo. Supports both global defaults and per-post overrides.
  - **Enhanced "View on GitHub" Button:** A dynamic, theme-aware button with an icon for better user engagement.
- **Advanced Layouts:**
  - A sophisticated post footer that responsively arranges the GitHub button and newsletter form side-by-side for a balanced, professional look.
- **Robust Authoring Experience:**
  - A comprehensive MDX template that allows for easy embedding of images, code blocks, and custom components like `TOCInline` and `BlogNewsletterForm`.
- **Theme-Aware Design:** All custom components seamlessly adapt to both light and dark modes.
- **Content & SEO:** Auto-generated post summaries, tag and category statistics, and SEO-friendly metadata.
- **Data Visualization:** Support for charts (Line, Bar, Pie) and a GitHub-style activity calendar.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 13](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Content Management:** [Contentlayer](https://www.contentlayer.dev/) (for MDX)
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/)
- **Newsletter Backend:** [Pliny](https://github.com/timlrx/pliny) Newsletter Utilities (configured for Buttondown)
- **UI & Interactivity:** [React](https://reactjs.org/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 💻 Getting Started Locally

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/KaikiDeishuuu/LambdaBlog.git
cd LambdaBlog
```

### 2. Install Dependencies

This project uses `yarn` as the package manager.

```bash
yarn install
```

### 3. Set Up Environment Variables

To use the newsletter subscription feature during local development, you'll need to set up an environment variable for your email provider.

1.  Create a new file named `.env.local` in the root of your project.
2.  Copy the contents of `.env.local.example` (if it exists) or add the following line, replacing the placeholder with your actual API key.

    ```.env.local
    BUTTONDOWN_API_KEY="your_buttondown_api_key_here"
    ```

    _Note: The `pliny/newsletter` package supports multiple providers. If you switch from Buttondown, you will need to update the provider in `siteMetadata.js` and use the corresponding environment variable (e.g., `MAILCHIMP_API_KEY`)._

### 4. Run the Development Server

```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

---

## 🌐 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

When deploying, remember to set up the same **Environment Variables** in your Vercel project settings. Go to your project's dashboard -> Settings -> Environment Variables to add your `BUTTONDOWN_API_KEY`. This ensures that your private API key is kept secure and is never exposed in your public GitHub repository.

## 🙏 Acknowledgements

A big thank you to [Timothy Lin](https://www.timlrx.com/) for creating the original [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog), which provided an excellent foundation for this project.

Additionally, this project references some components from the [Mizuki](https://github.com/matsuzaka-yuki/Mizuki) project. Thanks to the author for the inspiration and implementation.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
