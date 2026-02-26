<b>FAQ - about DOM 📣</b>

<b>• What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?</b>

Ans: 
Those all are Dom Function used to select HTML elements by Java script but they work differently. 

<b>getElementById() </b> =  selects one element by id and we know id must be unique in a html. This function returns a single html element.

<b>getElementsByClassName() </b> = selects all elements having this class. As we know same class can be given multiple elements. So this dom Function returns multiple elements (a html collection).

<b>querySelector() </b> = selects the first matching element using CSS selector('#myId' / '.btn' / main). This function returns a single html element actually the first matching element.

<b>querySelectorAll() </b> = Selects all matching elements using CSS selector. It returns NodeList.


<b>• How do you create and insert a new element into the DOM?</b>

Ans: 
At first i have to create a html element by document.createElement(). After that i can edit this created element by dom properties- .innerText / .innerHTML. After that insert that created element into dom by dom Function- appendChild() / append().

Code example:
const div = document.createElement("div");
div.innerText = "Hello sir";
document.body.appendChild(div);


<b>• What is Event Bubbling? And how does it work?
</b>
Ans: 
Event bubbling is the process where an event moves from the target element to its parent elements upward in the DOM. 

For example: 

<section>
    <div>
        <button>Click</button>
    </div>
</section>

If the button click, event will moves like (working mechanism)

Button -> div -> section -> body -> html -> document

<b>• What is Event Delegation in JavaScript? Why is it useful?
</b>
Ans: 
Event Delegation is a technique where we add an event listener to a parent element instead of multiple child elements. The parent handles events using event bubbling.

This technique is very useful beautiful because it Improves performance , works for dynamically created elements, easy to manage events.

Code example: 

document.getElementById("parent").addEventListener("click", function(e){
   if(e.target.tagName === "BUTTON"){
      console.log("Button clicked");
   }
});

<b>• What is the difference between preventDefault() and stopPropagation() methods? </b>

Ans: 
preventDefault() = stops default browser action

Used when we don't want browser refresh when we click form submit button.

Code example: 

form.addEventListener("submit", function(e){
  e.preventDefault();
});


stopPropagation() = stops event bubbling

Used when we don't want to run parent event by clicking child. 

Code example:

document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked");
});

document.getElementById("child").addEventListener("click", (e) => {
  e.stopPropagation(); 
  console.log("Button clicked");
});
