let steps = [step1Func,step2Func,step3Func] //封装了一个任务的多个步骤


function* iterateSteps(steps){
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        yield step()
    }
}

//将项目分解为多个执行的任务
let jobs = [job1,job2,job3]

function* iteratorJobs(jobs){
    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        yield* iterateSteps(job.steps) //执行每个任务里面的每个步骤，iterateSteps返回的是个遍历器所以用yield*
    }
}

//循环执行所有任务所有步骤
//只适用于所有步骤都是同步操作的情况，不能有异步操作的情况
for(var step of iteratorJobs(jobs)){
  console.log(step.id)
}