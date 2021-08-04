export default function deepCopy(obj: Serializable) {
  return JSON.parse(JSON.stringify(obj));
}
