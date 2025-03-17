import html2canvas from 'html2canvas-pro';

export async function downloadHudImage(element: HTMLElement, filename: string) {

  // clone the element
  const clone = element.cloneNode(true) as HTMLElement;

  // set the background color to transparent
  clone.style.backgroundColor = "white";

  // set the height and width to a 4/3 aspect ratio
  clone.style.height = "768px";
  clone.style.width = "1024px";

  // add the cloned element to the body
  document.body.appendChild(clone);

  const headingIndicator = clone.querySelector("#heading-indicator-background");

  if (headingIndicator) {
    (headingIndicator as HTMLElement).style.fill = "white";
  } 

  const canvas = await html2canvas(clone);

  // download the canvas as a png
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");

  // remove the cloned element from the body
  document.body.removeChild(clone);

  link.download = filename;
  link.click();
}

