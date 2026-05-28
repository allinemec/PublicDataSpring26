    
            //Consts/global variables  
            const w = 600;
            const h = 600;
            const margin = 60;
            const parseTime = d3.timeParse("%Y-%m");

            d3.csv("comment-data.csv").then(data => {
            console.log("data", data)
                
                data.forEach(d => { 
                d.date = parseTime(d.date);//parse this time data
                d.max = +d.max;
                d.min = +d.min;
                d.avg = +d.avg;    
                });
            
            //scales - with Scale Time
            const xScale = d3.scaleTime()
                             .domain(d3.extent(data, d => d.date)) 
                             .range([margin, w-margin]); 

            const yScale = d3.scaleLinear()
                             .domain([0, d3.max(data, d => Math.max(d.min, d.max))]) 
                             .range([h-margin, margin]); 

            //SVG
            const svg = d3.select("body")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

            //bottom axis 
            const bottomAxis = d3.axisBottom()
                                .scale(xScale)
                                .tickFormat(d3.timeFormat("%b"));
             
            svg.append("g")
                .attr("class", "axis") 
                .attr("transform", "translate(0," + (h-margin) + ")") 
                .call(bottomAxis);
            
            //left axis
            const leftAxis = d3.axisLeft()
                             .scale(yScale);
            
            svg.append("g")
               .attr("class", "axis") 
               .attr("transform", "translate(" + margin + ",0)")
               .call(leftAxis);
            
            function drawData(which){
                
                const coords = d3.line()
                .x(d=>xScale(d.date))
                .y(function(d){
                 if (which == "min"){ return yScale(d.min)}
                 else if (which == "max"){return yScale(d.max)}
                 else if (which == "avg"){return yScale(d.avg)}
                 else {return yScale(d.avg)}   
                });
                
                const line = svg.selectAll(".line")
                .data([data])    
                .join("path")//join!!
                .transition(data) // animate transitions
                .duration(1000) // speed of animation
                .attr("d", coords)
                .attr("class", "line");
            }
            
            d3.selectAll("button").on("click", (event,d)=>{
                const selected = event.currentTarget;
                    if (selected.id == "buttonMin"){
                    drawData("min")
                    } else if (selected.id == "buttonMax"){
                    drawData("max")
                    } else if (selected.id == "buttonAvg"){
                    drawData("avg")
                    } else {
                    drawData("avg")
                    }})
            
            drawData("avg")
            });
