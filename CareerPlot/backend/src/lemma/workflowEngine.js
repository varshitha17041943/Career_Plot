/**
 * This module simulates the Lemma SDK Agent orchestration.
 * In a real scenario, you'd use the official @lemma-work/lemma-platform SDK 
 * to define agents and connect them in a Directed Acyclic Graph (DAG).
 */

export class Agent {
  constructor(name, instruction, executor) {
    this.name = name;
    this.instruction = instruction;
    this.executor = executor;
  }

  async run(input, context = {}) {
    console.log(`[Agent: ${this.name}] Starting execution...`);
    try {
      const result = await this.executor(input, this.instruction, context);
      console.log(`[Agent: ${this.name}] Execution completed.`);
      return result;
    } catch (error) {
      console.error(`[Agent: ${this.name}] Execution failed:`, error);
      throw error;
    }
  }
}

export class Workflow {
  constructor(name) {
    this.name = name;
    this.steps = [];
  }

  addStep(agent, mapInput) {
    this.steps.push({ agent, mapInput });
    return this;
  }

  async execute(initialInput) {
    let currentContext = { initialInput };
    let lastOutput = initialInput;

    console.log(`[Workflow: ${this.name}] Starting...`);

    for (const step of this.steps) {
      const { agent, mapInput } = step;
      const agentInput = mapInput ? mapInput(lastOutput, currentContext) : lastOutput;
      
      const output = await agent.run(agentInput, currentContext);
      
      currentContext[agent.name] = output;
      lastOutput = output;
    }

    console.log(`[Workflow: ${this.name}] Completed.`);
    return currentContext; // Return full context containing all agent outputs
  }
}
