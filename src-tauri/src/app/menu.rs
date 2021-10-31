use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn custom_menu(name: &str) -> CustomMenuItem {
  let c = CustomMenuItem::new(name.to_string(), name);
  return c;
}

pub fn get_menu() -> Menu {
  Menu::new()
    .add_submenu(Submenu::new(
      // on macOS first menu is always app name
      "Adta",
      Menu::new()
        .add_native_item(MenuItem::About("Adta".to_string()))
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Hide)
        .add_native_item(MenuItem::HideOthers)
        .add_native_item(MenuItem::ShowAll)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Quit),
    ))
    // .add_submenu(Submenu::new(
    //   "File",
    //   Menu::new()
    //     .add_item(custom_menu("Open...").accelerator("cmdOrControl+O"))
    //     .add_native_item(MenuItem::Separator)
    //     .add_item(custom_menu("Close").accelerator("cmdOrControl+W"))
    //     .add_item(custom_menu("Save").accelerator("cmdOrControl+S"))
    //     .add_item(custom_menu("Save As...").accelerator("shift+cmdOrControl+S")),
    // ))
    .add_submenu(Submenu::new("Edit", {
      Menu::new()
        .add_native_item(MenuItem::Undo)
        .add_native_item(MenuItem::Redo)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Cut)
        .add_native_item(MenuItem::Copy)
        .add_native_item(MenuItem::Paste)
        .add_native_item(MenuItem::SelectAll)
        .add_native_item(MenuItem::Separator)
        .add_item(custom_menu("Toggle Done").accelerator("space"))
        .add_item(custom_menu("Delete Todo").accelerator("backspace"))
        .add_item(custom_menu("Edit Text").accelerator("enter"))
        .add_item(custom_menu("Cancel Edit Text").accelerator("escape"))
        .add_native_item(MenuItem::Separator)
        // I chose to let the frontend handle this, rather than using some listener. I
        // don't know if this is the best decision, however I only implemented this
        // because wihtout defining this, it will output the "non allowed" beep
        // noise whenever I tried to use my defined keybindings
        .add_item(custom_menu("New Todo").accelerator("cmdOrControl+n"))
    }))
    .add_submenu(Submenu::new("View", Menu::new()))
    .add_submenu(Submenu::new(
      "Window",
      Menu::new()
        .add_native_item(MenuItem::Minimize)
        .add_native_item(MenuItem::Zoom),
    ))
    .add_submenu(Submenu::new(
      "Help",
      Menu::new().add_item(custom_menu("Learn More")),
    ))
    .add_native_item(MenuItem::Copy)
}
