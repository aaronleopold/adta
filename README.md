# Adta

Adta is **A**nother **D**amn **T**odo **A**pp - pronounced _Ay-Duh_, not _Add-Tah_ because I think it sounds better. I know, I know - it's terrible off the tongue with the way it is spelled, but you can only do _so_ much when coming up with these acronyms as app names 😓

_what i'm really saying is if you have a better name reach out_ 😆

<h1 align="center">
  <img style="width:30%;" alt='Demo' src="https://github.com/aaronleopold/adta/blob/main/misc/demo.gif" />
</h1>

## Why?

I wanted to learn [Tauri](https://github.com/tauri-apps/tauri), and give working with databases in Rust a try, so I figured what better way to do both than by making a todo application. Adta uses SQLite to store your todos, and [SeaORM](https://github.com/SeaQL/sea-orm) to manage the database. Although something this small could have been done without an ORM, I wanted to learn SeaORM to build off this and tackle something larger. I also really wanted to start using Framer Motion more.

## Known issues

A lot of my original, intended user-interactions had to be scrapped because of a [Wry bug](https://github.com/tauri-apps/wry/issues/406) that affects tab navigation of focusable elements. So I decided to use a mixture of mainly gestures/mouse clicks. I tried to manually implement some sort of focusing system and keybinds, but it just didn't feel right - a little clunky. Once this bug is resolved, I might spend time switching over to keybinds, but this was just a fun little project for me to learn so who knows.

## License

[MIT](LICENSE) - please tear this thing apart and take what you need, but keep in mind this was a small app for me to learn and I didn't put much time into any optimizations. I've learned a lot from making it, but I likely wouldn't structure the app exactly the same way again.
