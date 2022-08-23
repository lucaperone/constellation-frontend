import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import G6, { IGroup, ModelConfig } from "@antv/g6"

import "./Graph.css"

let graph: any = null

type Props = {
    data: JSON
}

const Graph = ({ data }: Props) => {
    const ref = React.useRef(null)

    useEffect(() => {
        G6.registerNode(
            "background-animate",
            {
                afterDraw(cfg, group) {
                    if (cfg && cfg.size && group) {
                        let r
                        if (typeof cfg.size == "number") {
                            r = cfg.size / 2
                        } else {
                            r = cfg.size[0] / 2
                        }
                        // The first background circle
                        const back1 = group.addShape("circle", {
                            zIndex: -1,
                            attrs: {
                                x: 0,
                                y: 0,
                                r,
                                fill: cfg.color,
                                opacity: 0.6,
                            },
                            // must be assigned in G6 3.3 and later versions. it can be any value you want
                            name: "circle-shape1",
                        })
                        group.sort() // Sort the graphic shapes of the nodes by zIndex

                        // Magnify the first circle and fade it out
                        back1.animate(
                            {
                                r: r + 10,
                                opacity: 0,
                            },
                            {
                                repeat: true, // Play the animation repeatly
                                duration: 3000,
                                easing: "easeCubic",
                                delay: 0, // No delay
                            }
                        )
                    }
                },
            },
            "circle"
        )

        if (!graph) {
            graph = new G6.Graph({
                container: ref.current!,
                fitView: true,
                layout: {
                    type: "force",
                    preventOverlap: true,
                    linkDistance: 150,
                    nodeStrength: -150,
                    // type: "fruchterman",
                    // gravity: 5,
                    // speed: 2,
                    // workerEnabled: true, // Whether to activate web-worker
                    // gpuEnabled: true, // Whether to enable the GPU parallel computing, supported by G6 4.0
                },
                modes: {
                    default: ["drag-canvas", "zoom-canvas", "drag-node"],
                },
                defaultEdge: {
                    type: "bicubic",
                    style: {
                        stroke: "#505050",
                        lineWidth: 1,
                        lineDash: [10, 2],
                    },
                },
                defaultNode: {
                    style: {
                        fill: "#ff0046",
                        stroke: "#cc0029",
                        shadowColor: "#000000",
                        shadowBlur: 10,
                    },
                    labelCfg: {
                        style: {
                            fill: "#ffffff",
                            stroke: "#0d0d0d",
                        },
                    },
                },
            })
        }
        let newData = Object.assign(data)
        if (newData.nodes) {
            newData.nodes[0].type = "background-animate"
            newData.nodes[0].size = 35
            newData.nodes[0].color = "#ff3076"
            graph.data(newData)
        } else {
            graph.data(data)
        }
        graph.render()

        return () => {
            graph.destroy()
            graph = null
        }
    }, [data, ref])

    return <div ref={ref} id="container"></div>
}

export default Graph
