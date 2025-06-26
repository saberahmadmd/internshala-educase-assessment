class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill('w'),
      R: Array(9).fill('r'),
      F: Array(9).fill('g'),
      D: Array(9).fill('y'),
      L: Array(9).fill('o'),
      B: Array(9).fill('b'),
    };
    this.moveHistory = [];
  }

  rotateFace(face, clockwise = true) {
    const faceKey = face.toUpperCase(); // Normalize to uppercase
    const f = this.faces[faceKey];
    if (!f) return; // Guard against undefined face
    const newFace = f.slice();
    if (clockwise) {
      newFace[0] = f[6]; newFace[1] = f[3]; newFace[2] = f[0];
      newFace[3] = f[7]; newFace[4] = f[4]; newFace[5] = f[1];
      newFace[6] = f[8]; newFace[7] = f[5]; newFace[8] = f[2];
    } else {
      newFace[0] = f[2]; newFace[1] = f[5]; newFace[2] = f[8];
      newFace[3] = f[1]; newFace[4] = f[4]; newFace[5] = f[7];
      newFace[6] = f[0]; newFace[7] = f[3]; newFace[8] = f[6];
    }
    this.faces[faceKey] = newFace;
  }

  move(move) {
    const clockwise = !move.includes("'");
    const face = move[0].toUpperCase(); // Normalize to uppercase
    this.rotateFace(face, clockwise);

    let temp;
    switch (face) {
      case 'U':
        temp = this.getRow('B', 0);
        if (clockwise) {
          this.setRow('B', 0, this.getRow('R', 0));
          this.setRow('R', 0, this.getRow('F', 0));
          this.setRow('F', 0, this.getRow('L', 0));
          this.setRow('L', 0, temp);
        } else {
          this.setRow('B', 0, this.getRow('L', 0));
          this.setRow('L', 0, this.getRow('F', 0));
          this.setRow('F', 0, this.getRow('R', 0));
          this.setRow('R', 0, temp);
        }
        break;
      case 'D':
        temp = this.getRow('F', 2);
        if (clockwise) {
          this.setRow('F', 2, this.getRow('R', 2));
          this.setRow('R', 2, this.getRow('B', 2));
          this.setRow('B', 2, this.getRow('L', 2));
          this.setRow('L', 2, temp);
        } else {
          this.setRow('F', 2, this.getRow('L', 2));
          this.setRow('L', 2, this.getRow('B', 2));
          this.setRow('B', 2, this.getRow('R', 2));
          this.setRow('R', 2, temp);
        }
        break;
      case 'F':
        temp = [this.faces['U'][6], this.faces['U'][7], this.faces['U'][8]];
        if (clockwise) {
          this.faces['U'][6] = this.faces['L'][8];
          this.faces['U'][7] = this.faces['L'][5];
          this.faces['U'][8] = this.faces['L'][2];
          this.faces['L'][2] = this.faces['D'][2];
          this.faces['L'][5] = this.faces['D'][1];
          this.faces['L'][8] = this.faces['D'][0];
          this.faces['D'][0] = this.faces['R'][6];
          this.faces['D'][1] = this.faces['R'][3];
          this.faces['D'][2] = this.faces['R'][0];
          this.faces['R'][0] = temp[0];
          this.faces['R'][3] = temp[1];
          this.faces['R'][6] = temp[2];
        } else {
          this.faces['U'][6] = this.faces['R'][0];
          this.faces['U'][7] = this.faces['R'][3];
          this.faces['U'][8] = this.faces['R'][6];
          this.faces['R'][0] = this.faces['D'][2];
          this.faces['R'][3] = this.faces['D'][1];
          this.faces['R'][6] = this.faces['D'][0];
          this.faces['D'][0] = this.faces['L'][8];
          this.faces['D'][1] = this.faces['L'][5];
          this.faces['D'][2] = this.faces['L'][2];
          this.faces['L'][2] = temp[0];
          this.faces['L'][5] = temp[1];
          this.faces['L'][8] = temp[2];
        }
        break;
    }

    this.moveHistory.push(move);
    render();
  }

  getRow(face, row) {
    return this.faces[face].slice(row * 3, row * 3 + 3);
  }

  setRow(face, row, values) {
    for (let i = 0; i < 3; i++) {
      this.faces[face][row * 3 + i] = values[i];
    }
  }

  scramble(n = 10) {
    const moves = ['U', 'u', 'D', 'd', 'F', 'f'];
    for (let i = 0; i < n; i++) {
      const m = moves[Math.floor(Math.random() * moves.length)];
      this.move(m);
    }
  }

  solve() {
    const rev = this.moveHistory.slice().reverse().map(m => m.includes("'") ? m[0] : m[0] + "'");
    rev.forEach(m => this.move(m));
  }

  toString() {
    return this.faces.U.join('') + this.faces.R.join('') + this.faces.F.join('')
      + this.faces.D.join('') + this.faces.L.join('') + this.faces.B.join('');
  }
}

// --- Rendering using dummy getCubeSvg (replace with real one) ---
function getCubeSvg(faceStr) {
  // Simple placeholder: showing raw string
  return `<pre>${faceStr}</pre>`;
}

// --- Controls ---
const cube = new Cube();
function render() {
  document.getElementById('cubeDisplay').innerHTML = getCubeSvg(cube.toString());
}
function scrambleCube() {
  cube.scramble(10);
}
function solveCube() {
  cube.solve();
}
function moveCube(move) {
  cube.move(move);
}

render();