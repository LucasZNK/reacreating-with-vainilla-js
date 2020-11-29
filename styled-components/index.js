// Styled components with vainilla js
function component(strings, ...dynamicValues) {
  return function (props) {
    let newContent = strings.slice();
    dynamicValues.forEach((value, index) => {
      newContent[index] += props[value];
    });
    return newContent.join("");
  };
}

function render(component, container) {
  container.innerHTML = component;
}

function createStyledElements(htmlTags) {
  return htmlTags.reduce(
    (elements, tag) => (
      (elements[tag] = function (styles) {
        return function (content) {
          return `<${tag} style="${styles}">${content}</${tag}>`;
        };
      }),
      elements
    ),
    {}
  );
}

const props = {
  buttonMessage: "My Custom button styled",
};

const htmlTags = ["h1", "h2", "h3", "div", "p", "small", "br", "button"];

const styled = createStyledElements(htmlTags);

const ButtonStyled = styled.button`
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 14px 48px;
  color: #010606;
  font-size: 20px;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = component`<div> ${"buttonMessage"}</div>`(props);

const element = document.getElementById("container");
render([ButtonStyled(Button)], element);
