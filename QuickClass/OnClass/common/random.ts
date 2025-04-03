class UniqueDrawer {
    pool: string[];
    original: string[];
    constructor(students: string[]) {
      this.pool = [...students];
      this.original = [...students];
    }
  
    // 单次无放回抽取
    drawWithoutReplacement(n: number) {
      if(n > this.pool.length) throw new Error("Not enough candidates");
      
      const result = [];
      for(let i = this.pool.length - 1; i >= this.pool.length - n; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.pool[i], this.pool[j]] = [this.pool[j], this.pool[i]];
        result.push(this.pool[i]);
      }
      return result;
    }
  
    // 重置池
    reset() {
      this.pool = [...this.original];
    }
  }

export { UniqueDrawer };