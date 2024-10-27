interface ITask {
  id: number;
  title: string;
  statusId: number;
  createDate: string;
  description?: string;
}

export default ITask;
