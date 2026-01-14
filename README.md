# 🍕 Split Bill App

A modern, responsive web application for splitting meal bills fairly among friends. Calculate each person's share based on what they ordered, with support for shared items, tax, and service charges.

## ✨ Features

- **👥 Tablemate Management**: Add up to 20 people to split the bill
- **🍔 Food & Drink Tracking**: Track up to 50 items with quantities and prices
- **🤝 Shared Items**: Select which tablemates shared each item
- **💰 Extra Charges**: Add tax and service charges (split equally among all)
- **📊 Detailed Breakdown**: View itemized summary for each person
- **📱 Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **🎨 Modern UI**: Clean slate-gray theme with intuitive interface

## 🚀 Live Demo

[Add your deployed link here]

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### Development Tools
- **ESLint** - Code linting
- **React Compiler** - Performance optimization

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/split-bill-app.git
   cd split-bill-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 📖 How to Use

### 1. Add Tablemates
- Enter names of people splitting the bill
- Maximum 20 tablemates allowed

### 2. Add Food & Drinks
- Enter item name, quantity, and price
- Click "Choose" to select who shared each item
- Items can be shared by multiple people

### 3. Add Extra Charges (Optional)
- Add tax amount (split equally)
- Add service charge (split equally)

### 4. Calculate Bills
- Click "Calculate" to see each person's total
- Click "View" to see detailed breakdown
- Click "Re-Calculate" if you make changes
- Click "Reset" to clear results

### 5. View Summary
- See itemized list of what each person ate
- View their share of tax and service charges
- See complete calculation breakdown

## 🏛️ Project Structure

```
split-bill-app/
├── src/
│   ├── components/
│   │   ├── forms/
│   │   │   ├── NameForm.tsx           # Add tablemate form
│   │   │   ├── FoodDrinkForm.tsx      # Add food/drink form
│   │   │   └── ExtraChargeForm.tsx    # Tax/service charge form
│   │   ├── Modal/
│   │   │   ├── Modal.tsx              # Reusable modal wrapper
│   │   │   ├── TableMateSelector.tsx  # Select who shared item
│   │   │   └── SummaryModal.tsx       # Person's bill summary
│   │   ├── TableMateList.tsx          # List of tablemates
│   │   ├── FoodDrinkTable.tsx         # Food/drink items table
│   │   ├── PriceCalculationSection.tsx # Calculation section
│   │   ├── PriceCalculationTable.tsx  # Results table
│   │   ├── CalculationButtons.tsx     # Calculate/Reset buttons
│   │   ├── SectionTitle.tsx           # Section headers
│   │   └── Text.tsx                   # Text component
│   ├── hooks/
│   │   └── useTableMateModal.ts       # Modal state management
│   ├── utils/
│   │   └── billCalculator.ts          # Bill calculation logic
│   ├── App.tsx                        # Main app component
│   ├── main.tsx                       # Entry point
│   └── index.css                      # Global styles
├── public/                            # Static assets
├── index.html                         # HTML template
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── tailwind.config.js                 # Tailwind config
└── vite.config.ts                     # Vite config
```

## 🧮 Calculation Logic

### Price Per Person Formula:
```
Person's Share = (Σ Shared Items) + (Tax ÷ Total People) + (Service Charge ÷ Total People)
```

### Shared Item Cost:
```
Price Per Person = (Item Price × Quantity) ÷ Number of People Sharing
```

### Example:
```
Pizza ($20) shared by 3 people:
- Person A: $6.67
- Person B: $6.67
- Person C: $6.66

Tax ($5) split among 3:
- Each pays: $1.67

Total per person: $8.34, $8.34, $8.33
```

## 🎨 Theme & Design

- **Color Scheme**: Slate gray with white accents
- **Primary Color**: `slate-800` (#1e293b)
- **Secondary Color**: `slate-600` (#475569)
- **Background**: White
- **Typography**: System fonts with responsive sizing

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (default)
- **Tablet**: ≥ 640px (`sm:`)
- **Desktop**: ≥ 1024px (`lg:`)

## ⚙️ Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js`:
- Hide scrollbar utility
- Extended color palette
- Custom spacing

### TypeScript
Strict mode enabled for type safety

### Vite
- Fast HMR (Hot Module Replacement)
- Optimized production builds
- React Compiler integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

[Your Name]
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Vite](https://vitejs.dev/)

## 📞 Support

For support, email your.email@example.com or open an issue in the GitHub repository.

---

Made with ❤️ for splitting bills fairly