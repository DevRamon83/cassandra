export async function compressData(data: unknown): Promise<Uint8Array> {
  const jsonString = JSON.stringify(data);
  const byteStream = new Blob([jsonString]).stream();

  const compressedStream = byteStream.pipeThrough(
    new CompressionStream("gzip"),
  );

  const response = new Response(compressedStream);
  const blob = await response.blob();
  return new Uint8Array(await blob.arrayBuffer());
}

export async function decompressData<T>(
  compressedBytes: Uint8Array,
): Promise<T> {
  const byteStream = new ReadableStream({
    start(controller) {
      controller.enqueue(compressedBytes);
      controller.close();
    },
  });

  const decompressedStream = byteStream.pipeThrough(
    new DecompressionStream("gzip"),
  );

  const response = new Response(decompressedStream);
  const jsonText = await response.text();
  return JSON.parse(jsonText) as T;
}
