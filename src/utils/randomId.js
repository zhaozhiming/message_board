export default function randomId() {
  return (Date.now() * 1000 + parseInt(Math.random() * 1000, 10)).toString(16);
}
