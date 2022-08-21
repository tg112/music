// directiveにもlifecycleがある
// el - the element the binding sits on
// binding - an object which contains the args that are passed into the hooks
// vnode - allows you to refer directly to the node in the virtual DOM if you need to.
// prevNode - the previous vnode object before the direcitve was updated. (applies to beforeUpdate and updated hooks only)
export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} float-right text-yellow-400 text-2xl`;

    if (binding.arg === "full") {
      iconClass = binding.value;
    }

    if (binding.modifiers.right) {
      iconClass += " float-right";
    }

    if (binding.modifiers.yellow) {
      iconClass += " text-yellow-400";
    } else {
      iconClass += " text-green-400";
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
