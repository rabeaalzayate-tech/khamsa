import { Node, mergeAttributes } from '@tiptap/react';

export interface IframeOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    iframe: {
      setIframe: (options: { src: string; title?: string }) => ReturnType;
    };
  }
}

/**
 * Custom Tiptap block node for embedded iframes (e.g. YouTube, Vimeo, external embeds).
 */
export const Iframe = Node.create<IframeOptions>({
  name: 'iframe',
  group: 'block',
  atom: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'w-full h-full border-0',
        allowfullscreen: 'true',
        loading: 'lazy',
      },
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      title: {
        default: 'Embedded content',
      },
      allow: {
        default:
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      },
      allowfullscreen: {
        default: true,
      },
      frameborder: {
        default: '0',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        class:
          'my-6 aspect-video w-full overflow-hidden rounded-2xl border border-border shadow-xl bg-black',
      },
      ['iframe', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    ];
  },

  addCommands() {
    return {
      setIframe:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
