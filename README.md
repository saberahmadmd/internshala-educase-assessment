# 🧩 Rubik's Cube Solver – JavaScript (Intern Assessment)

This project demonstrates a simple **object-oriented** implementation of a **Rubik's Cube simulator** using **HTML, CSS, and JavaScript**. It allows:
- Manual rotations of cube faces
- Random scrambling of the cube
- Solving the cube using a reverse-move algorithm
- Basic rendering of cube state

> ⚠️ This project is designed for demonstration purposes. The solver does not implement an optimal solving algorithm (e.g., Kociemba). It focuses on logic, code structure, and functionality.

---

## 🚀 Features

- 🎯 Object-oriented cube representation (`Cube` class)
- 🔁 Manual face rotations (`U`, `D`, `F`, and their inverses)
- 🔀 Random cube scrambling
- ✅ Simple solver (reverses the scramble moves)
- 🧱 Basic string-based visualization using `getCubeSvg()`
- 🧪 Buttons for all interactions

---

## 🧠 How It Works

### Cube Model
- The cube has 6 faces: `U`, `D`, `F`, `B`, `L`, `R`
- Each face is represented by a 3×3 array (9 elements)
- Cube state is stored as:
  ```js
  {
    U: ['w', 'w', ..., 'w'],
    R: ['r', 'r', ..., 'r'],
    ...
  }
