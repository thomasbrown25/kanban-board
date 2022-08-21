import { LayoutContainer, Header } from './layout.styles';

const Layout = ({ children }) => {
    return (
        <LayoutContainer>
            <Header>Kanban Board</Header>
            {children}
        </LayoutContainer>
    );
};

export default Layout;
