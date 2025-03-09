import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, InputGroup, Pagination } from 'react-bootstrap';
import { proposalsData } from './data';
import ProposalItem from './ProposalItem';
import { ProposalStatus, ProposalCategory } from './types';

const ActiveProposals: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const filteredProposals = useMemo(() => {
    return proposalsData
      .filter(proposal => 
        (statusFilter === 'all' || proposal.status === statusFilter) &&
        (categoryFilter === 'all' || proposal.category === categoryFilter) &&
        (
          searchQuery === '' || 
          proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          proposal.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
  }, [statusFilter, categoryFilter, searchQuery]);

  const paginatedProposals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProposals.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProposals, currentPage]);

  const pageCount = Math.ceil(filteredProposals.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: document.getElementById('active-proposals')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  return (
    <section id="active-proposals" className="py-5">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <h2 className="fw-bold mb-3">Active Proposals</h2>
            <p className="lead">Currently open for discussion and voting</p>
          </Col>
        </Row>

        <div className="mb-4">
          <Row className="g-4">
            <Col md={4} lg={3}>
              <Form.Group controlId="statusFilter">
                <Form.Label>Status</Form.Label>
                <Form.Select 
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="discussion">In Discussion</option>
                  <option value="voting">Voting Open</option>
                  <option value="passed">Recently Passed</option>
                  <option value="implemented">Implemented</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} lg={3}>
              <Form.Group controlId="categoryFilter">
                <Form.Label>Category</Form.Label>
                <Form.Select 
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="funding">Fund Allocation</option>
                  <option value="platform">Platform Improvements</option>
                  <option value="impact">Impact Measurement</option>
                  <option value="growth">Platform Growth</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} lg={6}>
              <Form.Group controlId="searchProposals">
                <Form.Label>Search</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search proposals by title or description..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className="mb-4">
          {paginatedProposals.length > 0 ? (
            paginatedProposals.map(proposal => (
              <ProposalItem key={proposal.id} proposal={proposal} />
            ))
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x mb-3 text-muted"></i>
              <h3>No proposals found</h3>
              <p className="text-muted">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </div>

        {pageCount > 1 && (
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              
              {Array.from({ length: pageCount }).map((_, index) => {
                const pageNumber = index + 1;
                
                // Show current page, first page, last page, and one page before and after current
                if (
                  pageNumber === 1 || 
                  pageNumber === pageCount ||
                  pageNumber === currentPage ||
                  pageNumber === currentPage - 1 ||
                  pageNumber === currentPage + 1
                ) {
                  return (
                    <Pagination.Item
                      key={pageNumber}
                      active={pageNumber === currentPage}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  );
                }
                
                // Show ellipsis
                if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === pageCount - 1 && currentPage < pageCount - 2)
                ) {
                  return <Pagination.Ellipsis key={pageNumber} />;
                }
                
                return null;
              })}
              
              <Pagination.Next 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pageCount}
              />
            </Pagination>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ActiveProposals; 