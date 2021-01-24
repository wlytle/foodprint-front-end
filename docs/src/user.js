//handle clicks in the nav bar set up to accomoadate a future logout, login, and create app function

function handleNavClicks(e) {
  if (e.target.tagName !== "BUTTON") return;
  switch (e.target.id) {
    case "login-btn":
      // showLogin();
      break;
    case "log-out-btn":
      // logOutUser();
      break;
    case "about-btn":
      showAbout();
      break;
      break;
    default:
      return;
  }
}

//show about
function showAbout() {
  const div = document.getElementById("main-show");
  const body = `
  <h1>About</h1>
  <p>
    Food production is responsible for one quarter of the worlds greenhouse gas emissions. 
    FoodPrint Tracker shows the related climate impact of recipes and ingredients. Impact is tracked along three metrics <strong>Green House Gas Emissons,</strong>
    <strong>Embedded Water,</strong> and <strong>Eutrophication.</strong> Life cycle studies are notoriously difficult to conduct so the information here is necesarily incomplete.
    all data is given for averages across a collection of foods that belong to similar categories. Ingredients are fitted into these categories as best as possible. 
  </p>
  <h3>Green house Gas Emissions</h3>
  <p>
    Greenhouse gas emissions are measured in kilograms of carbon dioxide equivalent (kg of CO<sub>2</sub>Eq). Which gives the equivalent amount of CO<sub>2</sub> that would need to be realsed
    to have the same climatic impact as the total of all green house gas emissions for the life cycle of a food item.
  </p>
  <h3>Embedded Water</h3>
  <p>
    Embedded water is measured in liters and dhows the amount of wate consumed during the lifecycle of a food item.
  </p>
  <h3>Eutrophication</h3>
  <p>
    Eutrophication is the measurment of nutrient runoff into waterways and oceans. It is a major global impact of the food cycle and has catastrophic impacts on local and global ecosystems.
    Eutrophication is measured in grams of phosphate equivalent (PO<sub>4</sub>eq). Which gives the equivalent amount of PO<sub>4</sub> that would have to leaked to have the same climatic impact
    as all nutrients realsed in the lifecycle of the food item.
  </p>
   <h3>Data</h3>
   <p>
     All climate data provided by <a href="https://ourworldindata.org/environmental-impacts-of-food"> "Our World in Data"</a>. Data used in this project from: Hannah Ritchie (2020) - "Environmental impacts of food production". Published online at OurWorldInData.org. Retrieved from: 
     'https://ourworldindata.org/environmental-impacts-of-food' [Online Resource]  
     </p>
`;
  div.innerHTML = body;
}
