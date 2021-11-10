    // ==UserScript==
    // @name         ijkl nav cluster for Overleaf
    // @namespace    http://tampermonkey.net/
    // @version      0.1
    // @match        https://www.overleaf.com/project/*
    // @grant        none
    // @description  Mapping IJKL as the nav cluster and H as insert
    // ==/UserScript==
    // Based on code from https://www.overleaf.com/learn/how-to/How_can_I_define_custom_Vim_macros_in_a_vimrc_file_on_Overleaf%3F

(function() {
    'use strict';
    // poll until editor is loaded
    const retry = setInterval(() => {
        if (window._debug_editors === undefined) return
        clearInterval(retry)
        // get current editor instance
        const editor = window._debug_editors[window._debug_editors.length -1]
        // vim keyboard plugin
        const vimKeyboard = window.ace.require("ace/keyboard/vim")
        // normal mode applies while escaped
        vimKeyboard.Vim.noremap("k", "j", "normal") // K -> Down
        vimKeyboard.Vim.noremap("j", "h", "normal") // J -> Left
        vimKeyboard.Vim.noremap("i", "k", "normal") // I -> Up
        vimKeyboard.Vim.noremap("h", "i", "normal") // H -> Insert
        // set the modified keyboard handler for editor
        editor.setKeyboardHandler(vimKeyboard.handler)
        console.log("Custom key bindings applied")
    }, 100)
})();