import React, { Component } from 'react';
const d3 = require("d3");

class D3 extends Component {
    componentDidMount() {
        const svg = d3.select("svg"),
            width = +svg.attr("witdh"),
            height = +svg.attr("height"),
            g = svg.append("g").attr("tramsform", "translate(40,0)")

        const tree = d3.tree()
            .size([height - 400, width - 160])

        const cluster = d3.cluster()
            .size([height, width - 160])

        const stratify = d3.stratify()
            .parentId((d) => { return d.id.substring(0, d.id.lastIndexOf(".")); });

        d3.csv("flare.csv", (error, data) => {
            if (error) throw error;

            var root = stratify(data)
                .sort((a, b) => { return (a.height - b.height) || a.id.localeCompare(b.id); });

            cluster(root);

            var link = g.selectAll(".link")
                .data(root.descendants().slice(1))
                .enter().append("path")
                .attr("class", "link")
                .attr("d", this.diagonal);

            var node = g.selectAll(".node")
                .data(root.descendants())
                .enter().append("g")
                .attr("class", (d) => { return "node" + (d.children ? " node--internal" : " node--leaf"); })
                .attr("transform", (d) => { return "translate(" + d.y + "," + d.x + ")"; });

            node.append("circle")
                .attr("r", 2.5);

            node.append("text")
                .attr("dy", 3)
                .attr("x", (d) => { return d.children ? -8 : 8; })
                .style("text-anchor", (d) => { return d.children ? "end" : "start"; })
                .text((d) => { return d.id.substring(d.id.lastIndexOf(".") + 1); });

            d3.selectAll("input")
                .on("change", changed);

            var timeout = setTimeout(() => {
                d3.select("input[value=\"tree\"]")
                    .property("checked", true)
                    .dispatch("change");
            }, 1000);

            function changed() {
                timeout = clearTimeout(timeout);
                (this.value === "tree" ? tree : cluster)(root);
                var t = d3.transition().duration(750);
                node.transition(t).attr("transform", (d) => { return "translate(" + d.y + "," + d.x + ")"; });
                link.transition(t).attr("d", this.diagonal);
            }
        });
    }

    diagonal(d) {
        return "M" + d.y + "," + d.x
            + "C" + (d.parent.y + 100) + "," + d.x
            + " " + (d.parent.y + 100) + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
    }
    
    render() {
        console.log(d3);
        return (
            <div className="container">
                <h3>D3可视化图表</h3>
                <form>
                    <label htmlFor="sdfafad">
                        <input type="radio" name="mode" value="cluster"/>
                        Dendrogram
                    </label>
                    <label htmlFor="446566">
                        <input type="radio" name="mode" value="tree" />
                        Tree
                    </label>
                </form>

                <svg width="960" height="2400"></svg>
            </div>
        );
    }
}

export default D3;
