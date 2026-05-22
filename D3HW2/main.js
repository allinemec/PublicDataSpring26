//TODO
//Consts, including our heart path command points     
        const svgW = 800;
        const svgH = 600;
        const circle = ["M 100 100 m 75 0 a 75 75 0 1 0 -150 0 a 75 75 0 1 0 150 0"];
        const size = 150;
        const sizeY = 100;

        
        //Load data and related variables
        d3.csv("coffee-data.csv").then(data => {
              console.log("data", data)
          //format data
          data.forEach(d => { 
              d.day = d.day;
              d.coffee = +d.coffee; 
          });

        const maxData = d3.max(data, d=>d.coffee);
        const minData = d3.min(data, d=>d.coffee);
        const rowLength = data.length;//
        //const rowLength = 3;// what if we wanted to make a grid?

        const myColor = d3.scaleLinear()
                          .domain([minData, maxData])
                          .domain([0, maxData])
                          .range(["white", "orange"]);
        //Create a color scale
        //SVG
        const svg = d3.select("body")
                .append("svg")
                .attr("width", svgW) 
                .attr("height", svgH);

        //group    
        const g = svg.selectAll("g")//our group! 
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("transform", (d,i)=>{
                          const x = (i % rowLength) * size; 
                          const y = (Math.floor(i/rowLength)+1) * sizeY;
                          console.log("xy", [x,y])
                          return "translate(" + [x,y] + ")";})
        //hearts                  
        g.append("path")
        .attr("d", circle)
        .attr("fill", d=> myColor(d.coffee))//here we are applying color with .attr("fill")
        .attr("class", "circle"); 


        //labels
        g.append("text")
        .attr("x", size/2 + 20) //x coordinate
        .attr("y", size + 40) //y coordinate
        .attr("dy", "5px") //y coordinate offset
        .attr("class", "labels") 
        .text(d=>d.day); //the text 

        });  