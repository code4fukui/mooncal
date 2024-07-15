const pi = Math.PI;
const pi2 = pi * 2;
const topAngle = pi + pi / 2 * 3;
const bottomAngle = pi + pi / 2;
const start = [0, topAngle, 0];
const end = [pi2, bottomAngle, pi2];

export class MoonAge extends HTMLElement {
  constructor(size = 200) {
    super();
    size = this.size = this.getAttribute("size") || size;
    const halfSize = this.halfSize = size / 2;

    const c = this.c = [];
    const ctx = this.ctx = [];

    this.style.display = "inline-block";
    this.style.position = "relative";
    this.style.height = `${size}px`;
    this.style.width = `${size}px`;
    //this.style.backgroundColor = "black";
    for (let i = 0; i < 3; i++) {
      c[i] = document.createElement("canvas");
      this.appendChild(c[i]);
      c[i].style.position = "absolute";
      c[i].style.top = "0px";
      c[i].style.left = "0px";
      c[i].style.width = `${size}px`;
      c[i].style.height = `${size}px`;
      c[i].width = size;
      c[i].height = size;
      ctx[i] = c[i].getContext('2d');
      ctx[i].fillStyle = i === 0 ? '#444444' : '#ffff00';
      ctx[i].arc(halfSize, halfSize, halfSize * .95, start[i], end[i]);
      ctx[i].fill();
    }

    this.setDate(this.getAttribute("value"));
  }
  setDate(d) {
    console.log(d);
    const date = new Date(d);
    if (isNaN(date.getTime())) return;
    date.setHours(20); // org: 12
    const day = date.getTime() / 864e5 - 6.475;
      // 平均朔望月
    const r = 29.530588853 + 2.162e-9 * ((date.getTime() - 946727935816) / 315576e5);
    const age = day > 0 ? day % r : (r + day % r) % r;
    /*
    document.querySelector('#disp').innerHTML =
    `${date.toLocaleDateString()}<br>月齢:${age.toFixed(1)}`;
    */
    this.appearance(age, r);
  }
  appearance(age, m) {
    const size = this.size;
    const halfSize = this.halfSize;
    const c = this.c;
    const ctx = this.ctx;
    const s  = Math.cos(pi2 * age / m);
    const s2 = Math.sin(pi2 * age / m);
    const r  = Math.abs(halfSize * s);
    c[1].style.transform = `rotate(${s2 > 0 ? 180 : 0}deg)`;
    ctx[2].clearRect(0, 0, size, size);
    ctx[2].beginPath();
    ctx[2].fillStyle = s > 0 ? '#444444' : '#ffff00';
    ctx[2].arc(halfSize, halfSize, halfSize * .95, 0, pi2);
    ctx[2].fill();
    c[2].style.width = `${r * 2}px`;
    c[2].style.left = `${halfSize - r}px`;
  }
};
customElements.define("moon-age", MoonAge);
