import glob from 'glob';
// const fs = window.require('fs');
// const remote = window.require('electron').remote;

type FilePickerConfig = {
  name: string;
  extensions: string[];
  dir?: boolean;
};

export default function pickFile({ name, extensions, dir }: FilePickerConfig) {
  // let options: any = dir
  //   ? { properties: ['openDirectory'] }
  //   : { filters: [{ name, extensions }] };
  console.log(extensions);

  // @ts-ignore
  const result = window?.__TAURI__?.dialog?.open({
    directory: dir,
    filters: [{ name, extensions }]
  });

  // const result = remote.dialog.showOpenDialog(
  //   remote.getCurrentWindow(),
  //   options
  // );

  return result.then((filepath: string | null) => {
    return filepath;
  });
}

// export async function readImage(filePath: string) {
//   return fs.readFileSync(filePath, { encoding: 'utf8' });
// }

// export async function getDirectoryFiles(dir: string) {
//   return glob
//     .sync(`${dir}/*.jpg`, { nocase: true, absolute: true })
//     .map(file => file);
// }
