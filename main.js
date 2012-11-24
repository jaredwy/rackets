/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";

    var EditorManager   = brackets.getModule("editor/EditorManager"),
        CommandManager  = brackets.getModule("command/CommandManager"),
        Menus           = brackets.getModule("command/Menus"),
        StringUtils     = brackets.getModule("utils/StringUtils");

    var _getActiveSelection = function () {
        return EditorManager.getFocusedEditor().getSelectedText();
    },
    _getClosestSelectedWord = function () {
        var selection = EditorManager.getFocusedEditor().getSelection(),
            text = "";
        EditorManager.getFocusedEditor().selectWordAt(selection.start);
        text = _getActiveSelection();
        //restore the selection as select wordat has that side effect
        EditorManager.getFocusedEditor().setSelection(selection.start, selection.end);
        return text;
    },
     handleHelloWorld = function () {
        window.alert(_getClosestSelectedWord());
    };

    var contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);


    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "Refactor.refactor";   // package-style naming to avoid collisions
    CommandManager.register("Hello World", MY_COMMAND_ID, handleHelloWorld);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    contextMenu.addMenuItem(MY_COMMAND_ID, "Ctrl-Shift-R");
    
    // We could also add a key binding at the same time:
    //menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-H");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
    
    // Or you can add a key binding without having to create a menu item:
    //KeyBindingManager.addBinding(MY_COMMAND_ID, "Ctrl-Alt-H");

    // For dynamic menu item labels, you can change the command name at any time:
    //CommandManager.get(MY_COMMAND_ID).setName("Goodbye!");
});