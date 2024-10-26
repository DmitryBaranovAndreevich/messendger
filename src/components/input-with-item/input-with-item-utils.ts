import { Input } from "../input";
import { Label } from "../label";
import { InputWithItem } from "./input-with-item";
import styles from "./input-with-item.module.scss";

export function getInputWithItem({
  item,
  error,
  type,
  name,
  disabled,
  validateFunc,
}: {
  item: string;
  error: string;
  type: string;
  name: string;
  disabled: boolean;
  validateFunc?: (arg: string) => boolean;
}) {
  const state = {
    isError: false,
    value: "",
  };
  const input = new Input({
    type,
    className: styles.inputWithItem__input,
    name,
    disabled,
    events: {
      blur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        state.value = input.value;
        validateInputValue();
      },
      input: () => {
        setError(false);
      },
    },
  });

  const itemLabel = new Label({
    content: item,
    className: styles.inputWithItem__item,
  });

  const errorLabel = new Label({
    content: error,
    className: styles.inputWithItem__error,
  });

  errorLabel.hide();

  const inputWithItem = new InputWithItem({
    input,
    error,
    item,
    itemLabel,
    errorLabel,
  });

  function validateInputValue() {
    if (validateFunc && validateFunc(state.value)) {
      setError(true);
    } else {
      setError(false);
    }
  }

  function setError(key: boolean) {
    state.isError = key;
    if (state.isError) {
      errorLabel.show();
    } else {
      errorLabel.hide();
    }
  }

  return { inputWithItem, state, name, validateInputValue };
}
