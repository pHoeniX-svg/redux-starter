function payload<T>() {
  return (type: T) => ({ payload: type });
}

function id<T>(value: T) {
  return value;
}
