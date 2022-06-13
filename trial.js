let filesToUpload = 10;
let currentValue = filesToUpload;
for (let i = 0; i < filesToUpload; i++) {
  currentValue -= 1;
  console.log(
    Math.floor(((filesToUpload - currentValue) / filesToUpload) * 100)
  );
}
