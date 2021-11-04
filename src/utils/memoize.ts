import Hash from "@/common/types/Hash";

export default function memoize<ReturnValue>(
  func: (arg: string) => ReturnValue
) {
  const cache: Hash<ReturnValue> = {};

  return (arg: string) => {
    if (!cache.hasOwnProperty(arg)) {
      cache[arg] = func(arg);
    }
    return cache[arg];
  };
}
