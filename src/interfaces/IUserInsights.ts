import { GraphData } from "../types/GraphData";

export default interface IUserInsights {
    id: string;
    title: string;
    description?: string;
    integrationId: string;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
    graphData: GraphData;
    parameters: JSON;
    refreshRate: number;
    lastRefresh: string;
}

