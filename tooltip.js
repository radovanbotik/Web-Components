//every custom element needs to extend HTMLElement
class Tooltip extends HTMLElement {
  constructor() {
    //call super whenever extending
    super();
    //creating tooltipcontainer here so it can be accesse acrros whole component
    this._tooltipContainer;
    this._tooltipText = "Default text to display";
    //access shadow DOM
    this.attachShadow({ mode: "open" });
    const template = document.querySelector("#tooltip-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  //mounting to DOM
  connectedCallback() {
    //checks if component has attribute 'text' if so displays a custom text
    //if not displays a default text
    if (this.hasAttribute("text")) {
      //acccessing attribute and storing its value
      this._tooltipText = this.getAttribute("text");
    }
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));

    //appending element to shadow DOM
    this.shadowRoot.appendChild(tooltipIcon);
  }
  //_indicating that method is only to be called from inside the class
  _showTooltip() {
    //setting up tooltipcontainer
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;

    this.shadowRoot.appendChild(this._tooltipContainer);
  }
  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}
//object which allows us to register our own custom elements by using define() method
//Takes in 2 args:
///1. my own HTML tag(at least 2 words seperated by dash!), try to make it unique so we dont clash
///2. JS class with logic
customElements.define("radovanbotik-tooltip", Tooltip);
