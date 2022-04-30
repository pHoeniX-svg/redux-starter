function withPayloadType<PayloadType>() {
  return (type: PayloadType) => ({ payload: type });
}
