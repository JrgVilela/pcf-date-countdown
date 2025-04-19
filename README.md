# ⏳ DateCountdown

![Feito com 💙 para a Power Platform](https://img.shields.io/badge/feito%20com%20💙-Power%20Platform-blueviolet?style=flat-square)
![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178c6?logo=typescript&style=flat-square)
![PCF Compatible](https://img.shields.io/badge/PCF-Compatible-success?style=flat-square)
![Fully Customizable](https://img.shields.io/badge/100%25-Customizable-ffaa00?style=flat-square)

A customizable PCF (PowerApps Component Framework) control that displays a **countdown** based on a date field — with fully configurable visual statuses, colors, and labels.

---

## 💡 Features

- ⏳ Days remaining until a specified date
- 🎨 4 configurable status stages:
  - On Time (ex: ✅ Em dia)
  - Approaching (ex: ⚠️ A vencer)
  - Due Today (ex: 📅 Vence hoje)
  - Overdue (ex: ❌ Vencido)
- 🧩 Custom colors, text, and display per stage
- 🎯 Built-in logic for dynamic thresholds
- 💻 Works on model-driven Power Apps

---

## 📦 Parameters

| Parameter        | Description                         |
| ---------------- | ----------------------------------- |
| `value`          | The bound date field                |
| `diasAviso`      | Number of days before due for alert |
| `textoEmDia`     | Text for “on time” status           |
| `corEmDia`       | Color for “on time” status          |
| `textoAVencer`   | Text for “approaching” status       |
| `corAVencer`     | Color for “approaching” status      |
| `textoVenceHoje` | Text for “due today” status         |
| `corVenceHoje`   | Color for “due today” status        |
| `textoVencido`   | Text for “overdue” status           |
| `corVencido`     | Color for “overdue” status          |
| `corTextoStatus` | Font color for all statuses         |
| `textoDias`      | Custom text for “days left” label   |

---

## 🛠️ How to use

1. Add the control to a solution in Power Apps.
2. Bind to a `Date` field and configure the input parameters.
3. Enjoy real-time visual feedback as the deadline approaches or passes.

---

## 🧪 Local Testing

```bash
npm install
npm start
```

---

## 🚧 Roadmap — Next Version

📌 The following improvements are planned for an upcoming release:

- 🗓️ **Custom comparison date**  
  Allow users to compare the countdown against another date column from the Dataverse (instead of always using the current date). Useful for scenarios like “X days since approval” or “due after creation date”.

- ⚙️ **Custom stage configuration**  
  Support for configuring a custom number of stages (e.g., 2, 3, 5) with individual labels and thresholds.

- 🎨 **Optional icons**  
  Support for adding icons (emoji, SVG, or CSS classes) to each stage — shown next to or instead of the text label.

💡 Have a suggestion? Open an [issue](../../issues) or submit a PR!

---

## 🧠 Author

Developed with 💻 by **Jorge**  
Open to contributions, suggestions and Power Platform collabs!

---

## 📝 License

MIT License – see [LICENSE](LICENSE) for details.

---
