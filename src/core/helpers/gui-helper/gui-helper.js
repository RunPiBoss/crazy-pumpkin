import { Pane } from 'tweakpane';
import isMobile from 'ismobilejs';
import DEBUG_CONFIG from '../../configs/debug-config';

export default class GUIHelper {
  constructor() {
    this.gui = new Pane({
      title: 'Control panel',
    });

    this.gui.hidden = true;
    this.gui.containerElem_.style.width = '275px';

    const isMobileDevice = isMobile(window.navigator).any;

    // if (isMobileDevice) {
      this.gui.expanded = false;
    // }

    GUIHelper.instance = this;

    return this.gui;
  }

  getFolder(name) {
    const folders = this.gui.children;

    for (let i = 0; i < folders.length; i += 1) {
      const folder = folders[i];

      if (folder.title === name) {
        return folder;
      }
    }

    return null;
  }

  getController(folder, name) {
    for (let i = 0; i < folder.children.length; i += 1) {
      const controller = folder.children[i];

      if (controller.label === name) {
        return controller;
      }
    }

    return null;
  }

  getControllerFromFolder(folderName, controllerName) {
    const folder = this.getFolder(folderName);

    if (folder) {
      return this.getController(folder, controllerName);
    }

    return null;
  }

  showAfterAssetsLoad() {
    if (DEBUG_CONFIG.showControlPanel) {
      this.gui.hidden = false;
    }
  }

  static getGui() {
    return GUIHelper.instance.gui;
  }

  static getFolder(name) {
    return GUIHelper.instance.getFolder(name);
  }

  static getController(folder, name) {
    return GUIHelper.instance.getController(folder, name);
  }

  static getControllerFromFolder(folderName, controllerName) {
    return GUIHelper.instance.getControllerFromFolder(folderName, controllerName);
  }
}

GUIHelper.instance = null;
