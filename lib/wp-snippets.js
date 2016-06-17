'use babel';

import WpSnippetsView from './wp-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  wpSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.wpSnippetsView = new WpSnippetsView(state.wpSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.wpSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'wp-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.wpSnippetsView.destroy();
  },

  serialize() {
    return {
      wpSnippetsViewState: this.wpSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('WpSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
