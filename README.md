# Adta

Adta is **A**nother **D**amn **T**odo **A**pp - pronounced _Ay-Duh_, not _Add-Tah_ because I think it sounds better. I know, I know - it's terrible off the tongue with the way it is spelled, but you can only do _so_ much when coming up with these acronyms as app names 😓

_what i'm really saying is if you have a better name reach out_ 😆

TODO: preview here

## Why?

I wanted to learn [Tauri](https://github.com/tauri-apps/tauri), and give working with databases in Rust a try, so I figured what better way to do both than by making a todo application. Adta uses SQLite to store your todos, and [SeaORM](https://github.com/SeaQL/sea-orm) to manage the database. Although something this small could have been done without an ORM, I wanted to learn SeaORM to build off this and tackle something larger.

## Known issues

The only real, known issue is related to a [Wry bug](https://github.com/tauri-apps/wry/issues/406) that affects tab navigation of focusable elements. Basically, you can't tab between the todo items like you would expect. This has been a large pain for having keybinds that delete the currently focused todo, which is why I am _currently_ working towards having a different deletion method. I tried to manually implement some sort of focusing system but it just didn't feel right, a little clunky. Once this bug is resolved, I will likely switch over to keybinds, but for now it will be a mixture of gestures and keybinds

## License

[MIT](LICENSE) - tear this thing apart and take what you need :)
