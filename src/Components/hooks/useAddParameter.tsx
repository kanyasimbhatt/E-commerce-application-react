function useAddParameter<T extends object>(base_url: string, parameters: T) {
  const url = new URL(base_url);
  for (const a of Object.entries(parameters)) {
    url.searchParams.set(a[0], JSON.stringify(a[1]));
  }

  return [url];
}

export default useAddParameter;