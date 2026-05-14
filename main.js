    //Declare consts/global variables
        const margin = 30;
        const width = 800; // change the data to read labels
        const height = 500;


    //Load data 
        d3.csv("posts.csv").then(data => {
            console.log("data", data)
        //format data
        data.forEach(d => { 
            d.month = d.month;
            d.posts = +d.posts; 
        });
        
        const maxY = d3.max(data, d => d.posts);


    //Scales 
        const xScale = d3.scaleBand()
                        .domain(data.map(d => d.month))
                        .range([margin, width - margin])
                        .paddingInner(0.2); //made more room between bars
        
        const yScale = d3.scaleLinear()
                        .domain([0, maxY]) 
                        .range([height - margin, margin]);
        

    //SVG
        const svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

                    
    //Axes x and y
        const bottomAxis = d3.axisBottom()
                             .scale(xScale);
        
        const leftAxis = d3.axisLeft()
                           .scale(yScale);
        

    //Bars
        svg.selectAll("rect") 
            .data(data) 
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.month)) 
            .attr("y", d => yScale(d.posts)) 
            .attr("width", xScale.bandwidth()) // note this is specific to using the bandscale as the scale calculates padding
            .attr("height", d => (height-margin) - yScale(d.posts))
            .attr("fill", "coral");
        

    //Call axes
        svg.append("g")
            .attr("transform", "translate(0," + (height - margin) + ")") 
            .call(bottomAxis);

        svg.append("g")
            .attr("transform", "translate(" + margin + ",0)")
            .call(leftAxis); 

                
    });