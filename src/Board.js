import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();

    this.state = {
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status && client.status === 'in-progress'),
        complete: clients.filter(client => client.status && client.status === 'complete'),
      }
    }
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    }
    this.drake = null;

  }

  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'in-progress'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'complete'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'in-progress'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'in-progress'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'complete'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'complete'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'in-progress'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'in-progress'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'complete'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      // status: companyDetails[3],
      status: 'backlog'
    }));
  }
  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref}/>
    );
  }

  updateClient(el, target, source, sibling){
    // Reverting DOM changes from Dragula
    this.drake.cancel(true);

    let elCategory = el.getAttribute(['data-status']);
    let elId = el.getAttribute(['data-id']);
    let targetId = target.getAttribute(['data-id']);

    //Get current category of the el
    let oldCategory = ""; 
    if (elCategory === "backlog"){
      oldCategory = 'backlog';
    } else if (elCategory === "in-progress"){
      oldCategory = "inProgress";
    } else if (elCategory === "complete"){
      oldCategory = 'complete';
    }

    //Get the element
    let element = this.state.clients[oldCategory].filter(client => elId === client.id);

    // Copy the rest of the elements from the old list/location:
    let newList = this.state.clients[oldCategory].filter(client => {
      return elId !== client.id});

    this.setState(prevState => {
      let newClients = Object.assign({}, prevState.clients);
      newClients[oldCategory] = newList;
      return { clients: newClients };
    })

      // Find the new category & update the element's status property to the new category name:
      let newCategory = ""; 
      if (targetId === "Backlog"){
        newCategory = 'backlog';
        element[0].status = 'backlog';
      } else if (targetId === "In Progress"){
        newCategory = "inProgress";
        element[0].status = 'in-progress';
      } else if (targetId === "Complete"){
        newCategory = 'complete';
        element[0].status = 'complete';
      }
          
    // Copy the new category's list:
    let newCategoryCopy = this.state.clients[newCategory];

    if (sibling){
      let siblingIndex;
      let siblingId = sibling.getAttribute(['data-id']);

      for (let j = 0; j < newCategoryCopy.length; j++){
        if (siblingId === newCategoryCopy[j].id) {
          siblingIndex = j;
        }
      }
        newCategoryCopy.splice(siblingIndex, 0, element[0]);
      } else  { // If there's no siblings (aka the list is empty or we are adding to the end of the list, instead of replacing another element in it's position.)
        newCategoryCopy.push(element[0]);
    } 

    this.setState(prevState => {
      let newClients = Object.assign({}, prevState.clients);
      newClients[newCategory] = newCategoryCopy;
      return { clients: newClients };
    });
  }

  componentDidMount() {
    this.drake = Dragula([this.swimlanes.backlog, this.swimlanes.inProgress, this.swimlanes.complete], {
    isContainer: function (el) {
      return el.classList.contains('Swimlane-dragColumn');
    },
    moves: function (el, source, handle, sibling) {
      return true;
    },
    accepts: function (el, target, source, sibling) {
      return true;
    },
    copy: false,           
    copySortSource: false,
    revertOnSpill: false,              
    removeOnSpill: false,   
    mirrorContainer: document.body,   
    ignoreInputTextSelection: true
  });
    this.drake.on('drop', (el, target, source, sibling) => {
      this.updateClient(el, target, source, sibling);
    });
  }

  componentWillUnmount() {
    this.drake.remove();
  }

  render() {
    return ( 
      <div className="Board">
        <div className="container-fluid">
          <div className="row"> 
            <div className="col-md-4">
              {this.renderSwimlane('Backlog', this.state.clients.backlog, this.swimlanes.backlog)}
              </div>
            <div className="col-md-4">
              {this.renderSwimlane('In Progress', this.state.clients.inProgress, this.swimlanes.inProgress)}
              </div>
            <div className="col-md-4">
              {this.renderSwimlane('Complete', this.state.clients.complete, this.swimlanes.complete)}
              </div>  
          </div>
        </div>
      </div>
    );
  }
}