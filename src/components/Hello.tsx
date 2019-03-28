import * as React from "react";
import './Hello.scss'

export interface HelloProps { compiler: string; framework: string; }
export const Hello = (props: HelloProps) => <h1 className="Header">Hello from {props.compiler} and {props.framework}!</h1>;