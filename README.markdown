--From: The Forage - YC - Task 1 - Dragula (updates to Board.js and Swimlane.js)


<h2 id="task">Module 1 Task Overview</h2>

<b> Working Fullstack 1: </b> Frontend updates based on feedback.
Help update the frontend of a new productivity tool for shipping.
<br><br>
<b> Aim: </b> Your task is to take the base shipping productivity tool and add in the ability for the new feature, the kanban board, to move shipping requests, to two new lane statuses (in-progress and complete). <b><i> Don't worry about any backend updates for now.</i></b>
<br><br>
Acceptance Criteria
<ul>
<li> In the "Shipping Requests" tab of the application, all tasks should show in the backlog swimlane.</li>
<li> There should be 3 swimlanes.</li>
<li> When a user drags a card up, down or into another swimlane, it reorders the card and stays there. (frontend only)</li>
<li> When a card changes swimlane, it should change color </li>
</ul>

...

<p id="dragula">
The Dragula library has been installed, you can use it by importing it on top of each file that you need
<p> 

### `import Dragula from 'dragula';`

then use it by calling `Dragula` directly.

Visit Dragula repository on github for more information
[https://github.com/bevacqua/dragula](https://github.com/bevacqua/dragula)
