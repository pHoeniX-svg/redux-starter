function payload<T>() {
  return (type: T) => ({ payload: type });
}
