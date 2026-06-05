class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const updatedQuery = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete updatedQuery[el]);
    this.query = this.query.find(updatedQuery);

    return this;
  }
  sort() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
  paginate() {
    const page = this.queryString?.page * 1 || 1;
    const limit = this.queryString?.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
