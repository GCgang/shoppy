export async function uploadImage(file) {
  const uploadUrlResponse = await fetch(
    '/.netlify/functions/get-cloudflare-upload-url'
  );
  const uploadUrlData = await uploadUrlResponse.json();

  const data = new FormData();
  data.append('file', file);

  const uploadResponse = await fetch(uploadUrlData.result.uploadURL, {
    method: 'POST',
    body: data,
  });

  const result = await uploadResponse.json();
  return result.result.variants[0];
}
