
// const components = {
//   twoColumnImageBlock: {
//     html: '<div class="builder-component"><div class="row"><div class="col-sm-6 martop20"><img class="img-responsive" src="https://placehold.co/750x400"></div><div class="col-sm-6 martop20"><img class="img-responsive" src="https://placehold.co/750x400"></div></div></div>',
//     css: ''
//   },
//   threeColumnImageBlock: {
//     html: '<div class="builder-component"><div class="row"><div class="col-sm-4 martop20"><img class="img-responsive" src="https://placehold.co/750x606"></div><div class="col-sm-4 martop20"><img class="img-responsive" src="https://placehold.co/750x606"></div><div class="col-sm-4 martop20"><img class="img-responsive" src="https://placehold.co/750x606"></div></div></div>',
//     css: ''
//   }
// }

const components = {
  twoColumnImageBlock: {
    html: '<div class="row builder-component"><div class="col-sm-4 martop20"><h2 class="section-title editable">Voluptas ducimus</h2><p class="editable">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas ducimus non tempore dolorem aspernatur ut, voluptates qui? Laborum voluptatum, fugit fuga mollitia enim error sapiente molestiae quia exercitationem adipisci molestias animi unde aliquid, et, officia aspernatur atque at assumenda qui.</p></div><div class="col-sm-4 martop20"><h2 class="section-title editable">Voluptas ducimus</h2><p class="editable">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat eveniet quae, consequuntur soluta modi alias doloribus accusantium quos ab quidem cupiditate deserunt sequi dolores quis voluptates dicta sint eius. Iste officiis vel laborum atque illum, officia voluptate?</p></div><div class="col-sm-4 martop20"><h2 class="section-title editable">Voluptas ducimus</h2><p class="editable">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, debitis quis ducimus minima explicabo inventore possimus, sed asperiores culpa itaque voluptates ab dicta magni natus necessitatibus doloremque eaque quibusdam! Laborum fuga voluptates natus, laboriosam modi molestias hic provident magni, omnis, velit sunt dolorem!</p></div></div>',
    css: ''
  },
  threeColumnImageBlock: {
    html: '<div class="row builder-component"><div class="col-sm-4 martop20"><img class="img-responsive" src="https://placehold.co/750x606"></div><div class="col-sm-4 martop20"><img class="img-responsive" src="https://placehold.co/750x606"></div><div class="col-sm-4 martop20"><img class="img-responsive" src="https://placehold.co/750x606"></div></div>',
    css: ''
  }
}

const iframeCustomStyle = `

  h1, h2 {
    font-family: 'Cinzel', serif;
  }

  .container {
    font-size: 16px;
    font-family: 'Figtree', sans-serif;
  }

  .builder-component {
    border: 1px solid transparent;
    position: relative; /* This makes sure that absolute positioning of children is relative to the component */
  }

  .highlighted {
    border: 1px solid #D1D5DD;
    transition: border 0.3s;
  }
  .selected { 
    border: 1px solid #5046E6; 
  }
  .action-buttons {
    position: absolute;
    top: 8px;
    right: 8px;
    display: none;
  }
  .selected .action-buttons {
    display: block;
  }
  .action-button {
    background-color: white;
    border: 1px solid #ccc;
    margin-left: 2px;
    border-radius: 3px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    padding: 2px 6px;
  }
`;


document.addEventListener('DOMContentLoaded', function() {

  initializeIframe().then(iframeDocument => {
    // Additional code to manipulate iframe after initialization
    setupComponentButtons();
    makeTextEditable();

  }).catch(error => {
      console.error('Error initializing iframe:', error);
  });
});

function initializeIframe() {
  return new Promise((resolve, reject) => {
    const iframe = document.getElementById('renderWindow');
    iframe.onload = () => {
      const iframeDocument = iframe.contentDocument;
      const iframeHead = iframeDocument.head;
      const iframeBody = iframeDocument.body;

      // Add CSS Link
      let amaBundleLink = document.createElement("link");
      amaBundleLink.href = "https://www.amawaterways.com/bundles/css/main?v=PWSVHkvHke1ltB2A0NzvVp5NqOTzXRPuU_nuzuIbuJo1.css"; // Ensure this path is correct
      amaBundleLink.rel = "stylesheet";
      amaBundleLink.type = "text/css";
      iframeHead.appendChild(amaBundleLink);

      const googleFontsLink = document.createElement("link");
      googleFontsLink.href = "https://fonts.googleapis.com/css2?family=Cinzel&family=Figtree&display=swap"; // Ensure this path is correct
      googleFontsLink.rel = "stylesheet";
      googleFontsLink.type = "text/css";
      iframeHead.appendChild(googleFontsLink);

      // Add Custom Styles
      let styleElement = iframeDocument.createElement('style');
      styleElement.textContent = iframeCustomStyle;
      iframeHead.appendChild(styleElement);

      resolve(iframeDocument);
    };

    // Set initial srcdoc content
    iframe.srcdoc = '<html><head></head><body><div class="container"></div></body></html>';
  });
}


function setupComponentButtons() {
  document.querySelectorAll('.add-component-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const componentId = this.previousElementSibling.id;
      addComponentToIframe(components[componentId]);
    });
  });
}

function addComponentToIframe(component) {
  const iframeDocument = document.getElementById('renderWindow').contentDocument;
  // const styleElement = iframeDocument.createElement('style');
  // styleElement.textContent = component.css;
  // iframeDocument.head.appendChild(styleElement);

  // iframeDocument.body.insertAdjacentHTML('beforeend', component.html);

  let htmlEntryPoint = iframeDocument.body.firstElementChild;
  htmlEntryPoint.insertAdjacentHTML('beforeend', component.html);

  updateIframeInteractivity();
}


// Add event listeners to each component in the <iframe> for hover and click events.
function updateIframeInteractivity() {

  const iframeDocument = document.getElementById('renderWindow').contentDocument;

  iframeDocument.querySelectorAll('.builder-component').forEach(component => {
    // Hover event
    // component.addEventListener('mouseover', function() {
    //   this.classList.add('highlighted');
    // });
    // component.addEventListener('mouseout', function() {
    //   if (!this.classList.contains('selected')) {
    //     this.classList.remove('highlighted');
    //   }
    // });

    // Click event
    component.addEventListener('click', function() {
      console.log(`Clicked on` + component);

      iframeDocument.querySelectorAll('.builder-component').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      addControlButtons(this);
    });

    // Function to Add Control Buttons: adds Up/Down, Delete, and Edit buttons to the selected component
    function addControlButtons(component) {
      console.log("Attempting to add control buttons");

      let buttonsContainer = component.querySelector('.action-buttons');
      if (!buttonsContainer) {
        buttonsContainer = iframeDocument.createElement('div');
        buttonsContainer.className = 'action-buttons';

        const upButton = createActionButton('▲');
        const downButton = createActionButton('▼');
        const modifyButton = createActionButton('Edit');
        const cloneButton = createActionButton('Clone');
        const deleteButton = createActionButton('Delete');

        // Add event listeners for each button
        upButton.addEventListener('click', () => moveComponent(component, 'up'));
        downButton.addEventListener('click', () => moveComponent(component, 'down'));
        // modifyButton.addEventListener('click', () => moveComponent(component, 'down'));
        deleteButton.addEventListener('click', () => component.remove());

        buttonsContainer.appendChild(upButton);
        buttonsContainer.appendChild(downButton);
        buttonsContainer.appendChild(cloneButton);
        buttonsContainer.appendChild(modifyButton);
        buttonsContainer.appendChild(deleteButton);
        component.appendChild(buttonsContainer);
      }
    }

    function createActionButton(text) {
      const button = iframeDocument.createElement('button');
      button.textContent = text;
      button.className = 'action-button';
      return button;
    }

    // Functions for Moving and Deleting Components
    function moveComponent(component, direction) {
      if (direction === 'up' && component.previousElementSibling) {
        component.parentNode.insertBefore(component, component.previousElementSibling);
      } else if (direction === 'down' && component.nextElementSibling) {
        component.parentNode.insertBefore(component.nextElementSibling, component);
      }
    }

  });
}


function deleteAllBuilderComponents() {
  const iframeDocument = document.getElementById('renderWindow').contentDocument;
  const components = iframeDocument.querySelectorAll('.builder-component');

  components.forEach(component => component.remove());
}

function makeTextEditable() {
  // Select the elements you want to be editable
  document.querySelectorAll('.editable').forEach(element => {
      element.addEventListener('dblclick', function() {
          // Check if the element is already in edit mode
          if (this.getAttribute('contentEditable') !== 'true') {
              // Save current text for potential cancellation
              const originalText = this.textContent;

              // Make the element editable and focus on it
              this.setAttribute('contentEditable', 'true');
              this.focus();

              // Handle pressing Enter or losing focus
              this.addEventListener('keydown', function(e) {
                  if (e.key === 'Enter') {
                      e.preventDefault(); // Prevent new line on Enter key
                      this.blur(); // Lose focus to apply changes
                  }
              });

              // Revert to original text if changes are not committed
              this.addEventListener('blur', function() {
                  if (this.textContent.trim() === '') {
                      this.textContent = originalText;
                  }
                  this.setAttribute('contentEditable', 'false');
              }, { once: true }); // Use the listener only once
          }
      });
  });
}

// Call this function when the DOM is fully loaded or after adding new elements
document.addEventListener('DOMContentLoaded', function() {
  makeTextEditable();
});



/*
  UI Interface:
  Governs code related to UI changes like sidebar toggle and modal window
*/
// Sidebar
document.getElementById('toggle-sidebar').addEventListener('click', function() {
  const sidebar = document.querySelector('.sidebar');
  const container = document.querySelector('.container');
  const button = this;

  // Check if sidebar is currently visible
  if (sidebar.classList.contains('collapsed')) {
    sidebar.classList.remove('collapsed');
    container.classList.remove('collapsed');
    button.textContent = 'Hide Sidebar';
  } else {
    sidebar.classList.add('collapsed');
    container.classList.add('collapsed');
    button.textContent = 'Show Sidebar';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const iframe = document.querySelector('.render-content');

  document.getElementById('toggle-mobile').addEventListener('click', function() {
      iframe.style.width = '380px'; // Max width for extra small devices
  });

  document.getElementById('toggle-tablet').addEventListener('click', function() {
      iframe.style.width = '992px'; // Min width for small devices
  });

  document.getElementById('toggle-desktop').addEventListener('click', function() {
      iframe.style.width = '1200px'; // Min width for medium devices
  });

  document.getElementById('toggle-full-width').addEventListener('click', function() {
      iframe.style.width = '100%'; // Min width for medium devices
  });
});


// Modal
document.addEventListener('DOMContentLoaded', function() {
  const modalOverlay = document.getElementById('modalOverlay');
  const openModalButton = document.getElementById('openModal');
  const closeModalButton = document.getElementById('closeModal');
  const cancelButton = document.getElementById('cancel');
  const confirmButton = document.getElementById('confirm');

  function toggleModal(show) {
    if (show) {
      modalOverlay.classList.add('active');
    } else {
      modalOverlay.classList.remove('active');
    }
  }

  function confirmAction() {
    // Placeholder for whatever action needs to be taken
    console.log("Confirm action triggered");
    // Then close the modal
    toggleModal(false);
  }

  openModalButton.addEventListener('click', function() {
    toggleModal(true);
  });

  closeModalButton.addEventListener('click', function() {
    toggleModal(false);
  });

  cancelButton.addEventListener('click', function() {
    toggleModal(false);
  });

  confirmButton.addEventListener('click', function() {
    deleteAllBuilderComponents();
    toggleModal(false);
  });

  window.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
      toggleModal(false);
    }
  });
});
