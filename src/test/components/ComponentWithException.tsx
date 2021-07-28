export type ComponentWithExceptionProps = {
  fail: boolean;
};

export default function ComponentWithException({
  fail,
}: ComponentWithExceptionProps) {
  if (fail) {
    throw new Error(
      "A generated exception thrown during the rendering of a component"
    );
  }
  return <>Component successfully rendered</>;
}
